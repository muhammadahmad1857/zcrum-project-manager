import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

interface RequestType {
  type:
    | "organization_name"
    | "project_name"
    | "project_description"
    | "issue_title"
    | "issue_description";
  context: string;
  style: "formal" | "casual" | "creative";
}

export async function POST(req: NextRequest) {
  try {
    // Parse the body as JSON to match the expected RequestType structure
    const body = (await req.json()) as RequestType;

    const { type, context, style } = body;

    if (!type || !context || !style) {
      throw new Error(
        "Invalid request body. 'type', 'context', and 'style' are required."
      );
    }

    const genai = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");
    const model = genai.getGenerativeModel({
      model: process.env.GEMINI_MODEL || "",
    });

    const prompt = `
    Hey Gemini! You are a highly creative and intelligent generator designed to create unique, engaging, and relevant outputs. Your primary task is to generate names, descriptions, and titles based on the provided structured data. Here's how you should operate:
    
    ### Input Format:
    - **Data**: Provided below in triple quotes, which contains all the details required for the task. This data will specify the type of output to generate and the relevant context. Examples include:
      - **type**: The type of content to generate. It can be:
        - \`organization_name\`: Generate a unique and catchy name for an organization.
        - \`project_name\`: Generate an innovative name for a project.
        - \`issue_title\`: Generate a clear, actionable title for an issue.
        - \`issue_description\`: Write a detailed, professional markdown description for an issue.
        - \`general_description\`: Write a broader markdown-based description for a given topic.
      - **context**: The specific data or keywords that you should base your generation on. This helps make the output relevant and aligned with the task.
      - **style**: The tone or format to use for the output. It can include:
        - \`formal\`: For professional and structured output.
        - \`casual\`: For friendly and conversational tone.
        - \`creative\`: For innovative and imaginative results.
    
    ## Data:
    """
    {
      "type": "${type}",
      "context": "${context}",
      "style": "${style}"
    }
    """

    Focus on delivering high-quality, contextually appropriate content. Let’s begin!
    Note: Generate in markdown only anf only if the type is "related to issue description"
    `;

    const result = await model.generateContent(prompt);
    const resp = result.response;
    const content = resp.text();

    return NextResponse.json({
      content,
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      success: false,
    });
  }
}
