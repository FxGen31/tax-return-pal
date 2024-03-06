import { appConfig } from '@/configs/app-config';
import { CarUsageLog, CarUsageMeta } from '@/types';
import { BaseDirectory, readTextFile, writeTextFile } from '@tauri-apps/api/fs';

export class RecordService {
    // App folder in the Document directory
    private appFolderName: string;

    constructor() {
        this.appFolderName = appConfig.settings.appFolderName;
    }

    // Transform a string input to a valid file/directory name
    private sanitizeDirName(input: string): string {
        // Remove invalid characters
        const safeName = input.replace(/[/:*?"<>|]/g, '_');

        // Trim leading and trailing whitespace
        const trimmedName = safeName.trim();

        return trimmedName;
    }

    public async readCarUsageLogs(
        repositoryName: string,
        repositoryId: string
    ): Promise<[CarUsageMeta?, ...CarUsageLog[]]> {
        try {
            const textContent = await readTextFile(
                `${this.appFolderName}/${this.sanitizeDirName(
                    repositoryName
                )}_${repositoryId}/car-usage-logbook.json`,
                { dir: BaseDirectory.Document }
            );
            const carUsageLogs = JSON.parse(textContent);
            return carUsageLogs;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    public async updateCarUsageLogs(
        repositoryName: string,
        repositoryId: string,
        data: [CarUsageMeta, ...CarUsageLog[]]
    ): Promise<void> {
        try {
            await writeTextFile(
                `${this.appFolderName}/${this.sanitizeDirName(
                    repositoryName
                )}_${repositoryId}/car-usage-logbook.json`,
                JSON.stringify(data),
                {
                    dir: BaseDirectory.Document,
                    append: false,
                }
            );
        } catch (error) {
            console.log(error);
        }
    }
}
