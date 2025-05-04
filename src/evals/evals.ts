//evals.ts

import { EvalConfig } from 'mcp-evals';
import { openai } from "@ai-sdk/openai";
import { grade, EvalFunction } from "mcp-evals";

const getTotalUsersEval: EvalFunction = {
  name: "getTotalUsersEval",
  description: "Evaluates the get-total-users tool functionality",
  run: async () => {
    const result = await grade(openai("gpt-4"), "How many total Compresto users are there?");
    return JSON.parse(result);
  }
};

const getTotalProcessedFilesEval: EvalFunction = {
    name: "get-total-processed-files Evaluation",
    description: "Evaluates the total processed files retrieval from Compresto",
    run: async () => {
        const result = await grade(openai("gpt-4"), "How many files has Compresto processed so far?");
        return JSON.parse(result);
    }
};

const getTotalSizeReducedEval: EvalFunction = {
    name: "get-total-size-reduced Tool Evaluation",
    description: "Evaluates the total file size reduction from Compresto",
    run: async () => {
        const result = await grade(openai("gpt-4"), "How many bytes have been reduced by Compresto so far?");
        return JSON.parse(result);
    }
};

const getTotalUsersEval: EvalFunction = {
    name: 'Get Total Users Tool Evaluation',
    description: 'Evaluates the get total users functionality of Compresto',
    run: async () => {
        const result = await grade(openai("gpt-4"), "How many total users does Compresto have?");
        return JSON.parse(result);
    }
};

const getTotalProcessedFilesEval: EvalFunction = {
    name: 'get-total-processed-files Evaluation',
    description: 'Evaluates the functionality of the get-total-processed-files tool',
    run: async () => {
        const result = await grade(openai("gpt-4"), "How many files have been processed by Compresto so far?");
        return JSON.parse(result);
    }
};

const config: EvalConfig = {
    model: openai("gpt-4"),
    evals: [getTotalUsersEval, getTotalProcessedFilesEval, getTotalSizeReducedEval, getTotalUsersEval, getTotalProcessedFilesEval]
};
  
export default config;
  
export const evals = [getTotalUsersEval, getTotalProcessedFilesEval, getTotalSizeReducedEval, getTotalUsersEval, getTotalProcessedFilesEval];