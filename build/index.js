import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
const API_BASE = "https://amctrqowqyzxipgtwaxx.supabase.co/functions";
const USER_AGENT = "compresto-mcp/1.0";
// Create server instance
const server = new McpServer({
    name: "compresto-mcp",
    version: "1.0.0",
    capabilities: {
        resources: {},
        tools: {},
    },
});
// Helper function for making API requests
async function makeSupabaseRequest(url) {
    const headers = {
        "User-Agent": USER_AGENT,
        Accept: "application/json",
    };
    try {
        const response = await fetch(url, { headers });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return (await response.json());
    }
    catch (error) {
        console.error("Error making Supabase request:", error);
        return null;
    }
}
server.tool("get-total-users", "Get total users of Compresto", {}, async () => {
    const url = `${API_BASE}/v1/getLandingPageData`;
    const response = await makeSupabaseRequest(url);
    if (!response) {
        return {
            content: [
                {
                    type: "text",
                    text: "Failed to fetch user data"
                }
            ],
            isError: true
        };
    }
    return {
        content: [
            {
                type: "text",
                text: response.data.totalUsers.toString()
            }
        ]
    };
});
server.tool("get-total-processed-files", "Get total processed files of Compresto", {}, async () => {
    const url = `${API_BASE}/v1/getLandingPageData`;
    const response = await makeSupabaseRequest(url);
    if (!response) {
        return {
            content: [
                {
                    type: "text",
                    text: "Failed to fetch user data"
                }
            ],
            isError: true
        };
    }
    return {
        content: [
            {
                type: "text",
                text: `Processed ${response.data.totalCompressedVideos} files`
            }
        ]
    };
});
server.tool("get-total-size-reduced", "Get total file size reduced of Compresto", {}, async () => {
    const url = `${API_BASE}/v1/getLandingPageData`;
    const response = await makeSupabaseRequest(url);
    if (!response) {
        return {
            content: [
                {
                    type: "text",
                    text: "Failed to fetch user data"
                }
            ],
            isError: true
        };
    }
    return {
        content: [
            {
                type: "text",
                text: `Reduced ${response.data.totalReducedSize} bytes`
            }
        ]
    };
});
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Compresto MCP Server running on stdio");
}
main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});
