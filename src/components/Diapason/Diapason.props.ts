export interface DiapasonProps {
    diapason: {
        from: string;
        to: string;
    };
    setDiapason: (diapason: { from: string; to: string }) => void;
}
