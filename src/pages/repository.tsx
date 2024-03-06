import RepositoryViewer from '@/components/repository-viewer';
import { useRequiredParams } from '@/hooks/use-required-params';
import { selectRepositoryById } from '@/redux/slices/repositories-slice';
import { useAppSelector } from '@/redux/store';
import RepositoryLoadingPage from '@/pages/repository-loading';

export default function RepositoryPage() {
    const { repositoryId } = useRequiredParams<{ repositoryId: string }>();
    const repository = useAppSelector((state) =>
        selectRepositoryById(state, repositoryId)
    );

    if (!repository) return <RepositoryLoadingPage />;

    return <RepositoryViewer repository={repository} />;
}
