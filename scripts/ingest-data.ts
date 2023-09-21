import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { PINECONE_INDEX_NAME, PINECONE_NAME_SPACE } from "@/config/pinecone";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { CustomPDFLoader } from "@/lib/utils/customPDFLoader";
import { pinecone } from "@/lib/utils/pinecone-client";

/* Name of directory to retrieve your files from */
const filePath = "docs";

export const run = async () => {
  try {
    /*load raw docs from the all files in the directory */
    const directoryLoader = new DirectoryLoader(filePath, {
      ".pdf": (path) => new CustomPDFLoader(path),
    });

    // const loader = new PDFLoader(filePath);
    const rawDocs = await directoryLoader.load();

    /* Split text into chunks */
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    const docs = await textSplitter.splitDocuments(rawDocs);

    console.log("creating vector store...");
    /*create and store the embeddings in the vectorStore*/
    const embeddings = new OpenAIEmbeddings();
    const index = pinecone.Index(PINECONE_INDEX_NAME); //change to your own index name

    console.log("🚀 turbo : start embed the PDF documents");
    //embed the PDF documents
    await PineconeStore.fromDocuments(docs.slice(0, 100), embeddings, {
      pineconeIndex: index,
      namespace: PINECONE_NAME_SPACE,
      textKey: "text",
    });
  } catch (error) {
    console.log("🚀 turbo : error: ", error);
    throw new Error("Failed to ingest your data");
  }
};

(async () => {
  await run();
  console.log("ingestion complete");
})();
