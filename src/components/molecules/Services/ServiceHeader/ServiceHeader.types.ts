export interface ServiceHeaderProps {
    exportToExcel: () => void;
    exportToPdf: () => void;
    createService: () => void;
    onDatesChange: (dates: any) => void;
}
