// 지금은 context 를 기억하지 못해서 제대로 대답하지 못함. lang chain 을 써야할듯?

export const stock_traslate_prompt = `내가 앞으로 여러개의 자료를 제공할 거야. 그 자료들을 받으면 '확인'이라고만 대답해주고, 내용을 잘 기억해줘. 그리고 나중에 '분석해줘' 라고 하면 내가 제공한 자료들을 주식 투자 전문가로서 분석해서 보고서를 작성해줘. 그리고 이 기업에 대한 투자 의견을 작성해주고, 내용 중 중요한 부분들을 표로 정리해줘.`;

export const stock_traslate_prompt_eng = `I'm going to give you a bunch of data several times, and when you get them, you're just going to say, "확인" and you're going to memorize them. Later, I'll say, "분석해줘" and you'll analyze the data I've provided as a stock investment expert and write a report. and You'll write an investment opinion on the company, and you'll organize the important parts in a table. answer in Korean.`;
