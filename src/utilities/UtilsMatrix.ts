export default class UtilsMatrix {

    /**
     * recibe una matriz y la retorna con una rotación de 90º
     * en el sentido de las manecillas del reloj.
     * @param dna
     * @returns string[][]
     */
    public static rotate90Clockwise(dna: string[][]): string[][] {
        const dimension = dna.length;
        const clonedna = JSON.parse(JSON.stringify(dna));

        for (let i = 0; i < Math.floor(dimension / 2); i++) {
            for (let j = i; j < dimension - i - 1; j++) {

                const temp = clonedna[i][j];
                clonedna[i][j] = clonedna[dimension - 1 - j][i];
                clonedna[dimension - 1 - j][i] = clonedna[dimension - 1 - i][dimension - 1 - j];
                clonedna[dimension - 1 - i][dimension - 1 - j] = clonedna[j][dimension - 1 - i];
                clonedna[j][dimension - 1 - i] = temp;
            }
        }
        return clonedna;
    }

    /**
     * Transfoma una matrix uni-dimencional en una matrix NxN.
     * @param dnaSequence
     * @returns string[][]
     */
    public static normalizeMatriz(dnaSequence: string[]): string[][] {
        const newDNA: string[][] = [];
        dnaSequence.forEach((dna) => {
            newDNA.push(dna.split(''));
        });

        return newDNA;
    }

    /**
     * Valida si la matriz de secuencia de ADN es una matrix de la forma
     * NxN.
     * @param dnaSequences
     * @returns number
     */
    public static validateMatrixNxN(dnaSequences: string[][]): number {
        const dimensionReference = dnaSequences.length;
        dnaSequences.forEach((dna) => {
            if (dna.length !== dimensionReference) {
                throw Error('Los datos de entrada no corresponden a una matriz NxN');
            }
        });

        return dimensionReference;
    }
}
