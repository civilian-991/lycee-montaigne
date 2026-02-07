const DEFAULT_PAGE_SIZE = 20;

export function parsePagination(searchParams: Record<string, string | string[] | undefined>) {
  const page = Math.max(1, parseInt((searchParams.page as string) || "1", 10) || 1);
  const pageSize = DEFAULT_PAGE_SIZE;
  const skip = (page - 1) * pageSize;
  return { page, pageSize, skip, take: pageSize };
}

export function parseSearch(searchParams: Record<string, string | string[] | undefined>) {
  const q = ((searchParams.q as string) || "").trim();
  return q;
}

export function totalPages(count: number, pageSize: number = DEFAULT_PAGE_SIZE) {
  return Math.max(1, Math.ceil(count / pageSize));
}
