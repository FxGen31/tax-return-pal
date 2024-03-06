import { appConfig } from '@/configs/app-config';
import { Repository } from '@/types';
import {
    exists,
    BaseDirectory,
    readTextFile,
    writeTextFile,
    createDir,
    removeDir,
} from '@tauri-apps/api/fs';
import { customAlphabet } from 'nanoid';

export class RepositoryService {
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

    // Create app folder and app configuration file on the first app launch
    public async folderCreationOnFirstAppLaunch(): Promise<void> {
        try {
            // Skip if the app folder has been created
            if (
                await exists(this.appFolderName, {
                    dir: BaseDirectory.Document,
                })
            ) {
                return;
            } else {
                // Create app folder
                await createDir(this.appFolderName, {
                    dir: BaseDirectory.Document,
                    recursive: true,
                });
                // Create app configuration file
                await writeTextFile(
                    `${this.appFolderName}/repositories.conf`,
                    '[]',
                    {
                        dir: BaseDirectory.Document,
                    }
                );
            }
        } catch (error) {
            return;
        }
    }

    // Get all repositories
    public async getRepositories(): Promise<Repository[]> {
        try {
            const textContent = await readTextFile(
                `${this.appFolderName}/repositories.conf`,
                { dir: BaseDirectory.Document }
            );
            const repositories = JSON.parse(textContent);
            return repositories;
        } catch (error) {
            // If an error occurs, return an empty array.
            console.log(error);
            return [];
        }
    }

    // Add a repository
    public async addRepository(
        repository: Omit<Repository, 'id'>
    ): Promise<Repository | null> {
        try {
            // Generate a unique identifier
            const nanoid = customAlphabet('1234567890abcdef', 9);
            const repositoryId = nanoid();
            // Append to repository name to prevent duplicated directory name
            const dirName = `${this.sanitizeDirName(
                repository.name
            )}_${repositoryId}`;

            // Create a directory for the repository to hold assets
            createDir(`${this.appFolderName}/${dirName}`, {
                dir: BaseDirectory.Document,
                recursive: true,
            });

            // Update the repository details in the app configuration file
            const newRepository: Repository = {
                id: repositoryId,
                ...repository,
            };
            newRepository.path = `${this.appFolderName}/${dirName}`;

            const textContent = await readTextFile(
                `${this.appFolderName}/repositories.conf`,
                { dir: BaseDirectory.Document }
            );
            const repositories: Repository[] = JSON.parse(textContent);
            repositories.push(newRepository);
            await writeTextFile(
                `${this.appFolderName}/repositories.conf`,
                JSON.stringify(repositories),
                {
                    dir: BaseDirectory.Document,
                    append: false,
                }
            );

            // Create sub-directories for records
            await writeTextFile(
                `${this.appFolderName}/${dirName}/car-usage-logbook.json`,
                '[]',
                {
                    dir: BaseDirectory.Document,
                }
            );
            await writeTextFile(
                `${this.appFolderName}/${dirName}/work-related-expense.json`,
                '[]',
                {
                    dir: BaseDirectory.Document,
                }
            );
            await writeTextFile(
                `${this.appFolderName}/${dirName}/work-from-home-logbook.json`,
                '[]',
                {
                    dir: BaseDirectory.Document,
                }
            );
            await createDir(`${this.appFolderName}/${dirName}/invoices`, {
                dir: BaseDirectory.Document,
                recursive: true,
            });

            return newRepository;
        } catch (error) {
            return null;
        }
    }

    // Remove a repository
    public async deleteRepository(id: string): Promise<Repository | null> {
        try {
            let repositories = await this.getRepositories();
            const repository = repositories.find(
                (repository) => repository.id == id
            );
            if (repository) {
                // Remove the corresponding directory of the target repository
                await removeDir(repository.path, {
                    dir: BaseDirectory.Document,
                    recursive: true,
                });
                // Update the repositories in the app configuration file
                repositories = repositories.filter(
                    (repository) => repository.id !== id
                );
                await writeTextFile(
                    `${this.appFolderName}/repositories.conf`,
                    JSON.stringify(repositories),
                    {
                        dir: BaseDirectory.Document,
                        append: false,
                    }
                );
                return repository;
            } else {
                return null;
            }
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}
