import { ParsedCvData,CvFeedback } from '../../models/Profile';

export interface IAIService {
    parseCv(fileBuffer: Buffer, mimeType: string): Promise<ParsedCvData>;
    analyzeCv(cvData: ParsedCvData): Promise<CvFeedback>;
}