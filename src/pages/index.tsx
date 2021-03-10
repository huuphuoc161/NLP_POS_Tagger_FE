import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Input, Button, Tooltip } from 'antd';
import axios from 'axios';

const { TextArea } = Input;

const IndexPage = (props: any) => {
  const [data, setData] = useState([]);
  const [sentence, setSentence] = useState('');

  function onChangeInput(e) {
    setSentence(e.target.value);
  }

  function fetchPOSTags() {
    const url = `https://nlp-pos-tagger.herokuapp.com/?sentence=${encodeURIComponent(
      sentence
    )}`;
    axios.get(url).then((data) => {
      console.log(data.data);
      setData(data.data);
    });
  }

  return (
    <>
      <Head>
        <title>NLP</title>
        <meta name="robots" content="index, follow" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={'NLP POS Tagger'} />
        <meta property="og:title" content="NLP POS Tagger" />
        <meta
          property="og:description"
          content="NLP POS Tagger"
        />
        <meta property="og:image" content="lock-2.png" />
        <link rel="shortcut icon" href="favicon.ico" />
      </Head>
      <div className="wrapper">
        <header className="wrapper__header">NLP POS Tagger</header>
        <div className="wrapper__input-data">
          <TextArea
            rows={4}
            value={sentence}
            onChange={onChangeInput}
            onPressEnter={fetchPOSTags}
          />
          <Button
            className="wrapper__input-data__btn-submit"
            type="primary"
            onClick={fetchPOSTags}
          >
            Submit
          </Button>
        </div>
        <div className="wrapper__result">
          {data.map(([word, tag], index) => {
            return (
              <Tooltip
                placement="bottom"
                title={tag}
                visible={true}
                key={`w-${index}`}
                className="wrapper__result__tooltip"
              >
                <Button>{word}</Button>
              </Tooltip>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default IndexPage;
