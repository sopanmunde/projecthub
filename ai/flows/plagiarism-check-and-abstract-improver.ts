'use server';

/**
 * @fileOverview Checks project abstracts for originality and suggests improvements.
 *
 * - plagiarismCheckAndAbstractImprover - A function that handles the plagiarism check and abstract improvement process.
 * - PlagiarismCheckAndAbstractImproverInput - The input type for the plagiarismCheckAndAbstractImprover function.
 * - PlagiarismCheckAndAbstractImproverOutput - The return type for the plagiarismCheckAndAbstractImprover function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PlagiarismCheckAndAbstractImproverInputSchema = z.object({
  projectAbstract: z
    .string()
    .describe('The project abstract to check for plagiarism and improve.'),
});
export type PlagiarismCheckAndAbstractImproverInput = z.infer<
  typeof PlagiarismCheckAndAbstractImproverInputSchema
>;

const PlagiarismCheckAndAbstractImproverOutputSchema = z.object({
  originalityReport: z
    .string()
    .describe('A report on the originality of the project abstract.'),
  improvedAbstract: z
    .string()
    .describe('An improved version of the project abstract.'),
});
export type PlagiarismCheckAndAbstractImproverOutput = z.infer<
  typeof PlagiarismCheckAndAbstractImproverOutputSchema
>;

export async function plagiarismCheckAndAbstractImprover(
  input: PlagiarismCheckAndAbstractImproverInput
): Promise<PlagiarismCheckAndAbstractImproverOutput> {
  return plagiarismCheckAndAbstractImproverFlow(input);
}

const prompt = ai.definePrompt({
  name: 'plagiarismCheckAndAbstractImproverPrompt',
  input: {schema: PlagiarismCheckAndAbstractImproverInputSchema},
  output: {schema: PlagiarismCheckAndAbstractImproverOutputSchema},
  prompt: `You are an expert in academic writing and plagiarism detection.

You will receive a project abstract and must:
1.  Analyze the abstract for potential plagiarism issues, providing a detailed originality report.
2.  Suggest improvements to the abstract to enhance its clarity, conciseness, and originality.

Project Abstract: {{{projectAbstract}}}

Originality Report:
Improved Abstract: `,
});

const plagiarismCheckAndAbstractImproverFlow = ai.defineFlow(
  {
    name: 'plagiarismCheckAndAbstractImproverFlow',
    inputSchema: PlagiarismCheckAndAbstractImproverInputSchema,
    outputSchema: PlagiarismCheckAndAbstractImproverOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
