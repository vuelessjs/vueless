const bytesInMegabyte = 1024 * 1024;

export function getFileMbSize(file: File) {
  return (file.size / bytesInMegabyte).toFixed(2);
}
