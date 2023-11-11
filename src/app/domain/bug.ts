export interface Bug {
    id: string;
    title: string;
    description: string;
    priority: number;
    reporter: string;
    status: string;
    created: Date;
    comments: Comment[];
}
