export interface SportsItem {
    sportId: number;
    sportName: string;
    description: string;
    reatedAt: string;
}

export interface SportsSection {
    total: number;
    page: number;
    pageSize: number;
    data: SportsItem[];
}