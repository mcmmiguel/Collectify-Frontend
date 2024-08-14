export function getPublicIdFromUrl(imageUrl: string): string {
    const parts = imageUrl.split('/');
    const filename = parts[parts.length - 1];
    return filename.split('.')[0];
}