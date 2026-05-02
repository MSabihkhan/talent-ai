import { ParsedCvData } from '../../models/Profile';

export interface IAIService {
    parseCv(fileBuffer: Buffer, mimeType: string): Promise<ParsedCvData>;
}