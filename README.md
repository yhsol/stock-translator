# Stock Translator Powered by GPT

## Simple Question and Answering

## Chat With A PDF

- Part 1

  - pdf 를 text 로 convert 하고 청크로 나눠서 저장.
  - lnag chain 을 사용해서 청크로 분할하는 문제를 극복하고 각 청크는 텍스트의 특정 문자 수가 될 것.
  - 청크를 가지고 임베딩함. 임베딩은 텍스트의 숫자 표현. 그것을 어딘가에 저장할 것.
  - PDF Docs -> (Convert to Text) -> TEXT -> (Split the text into chunks) -> Chunks -> Create Embeddings -> VectorStore(Pinecone)

- Part 2

  - Frontend 에서 사용자가 질문.
  - 이 질문에 PDF 를 기반으로 대답.
  - 채팅 기록과 결함. LLM 으로 보냄.
  - Chat History + New Question -> LLM(GPT-3.5/4) -> Question -> Create embeddings - [0.1, 0.2, 1.1] 이런 식으로 vector 형태로 생긴거. 텍스트를 represent 하는 것. -> OpenAI Embedding (Ada) -> VectorStore -> 그러면 저장되어 있는 청크들과 비교. 어떤 청크가 질문과 가장 유사한지. 그러면 내장된 관련 문서 살펴봄.(PDF Docs) -> 그 다음 질문과 관련 Docs 를 결합 -> LLM -> Answer

- Work
  - langchain 에 pdf loader 가 있음. 이걸 활용해서 pdf 읽기.
  - pdf 가 너무 크면 다 저장하지를 못한다. 어느 정도에서 잘라야 저장됨.
