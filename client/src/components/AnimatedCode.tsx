/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useEffect, useState } from "react";
import Code from "./Code";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode, faBook } from "@fortawesome/free-solid-svg-icons";
import RandomQuoteGenerator from "@/middlewares/RandomQuoteGenerator";
interface AppProps {}
const AnimatedCode: FC<AppProps> = () => {
  const firstpart = `
import React, { useState, useEffect } from 'react';

const Motivation = () => {
  const [alive, setAlive] = useState(true); 
`;

  const name = ` const [learning, setLearning] = useState(false);

  useEffect(() => {
    if (alive) {
      setLearning(true);
    }
  }, [alive]);`;

  const property = `
  return (
    <div>
      {learning ? (
        <h1>Keep learning and growing!</h1>
      ) : (
        <h1>Let's start the journey of learning.</h1>
      )}
    </div>
  );`;

  const rest = `
};

export default Motivation;
`;

  const [quote, setQuote] = useState<string>("");
  const [devMode, setDevMode] = useState(false);

  //!SECTION this is only for development purpose
  useEffect(() => {
    if (!devMode) {
      setDevMode(true);
      return;
    }
    const fetchQuote = async () => {
      const quote1 = await RandomQuoteGenerator();
      setQuote(quote1);
    };

    fetchQuote();
  }, [devMode]);

  const firstpartLines = firstpart.split("\n").length;
  const nameLines = name.split("\n").length;
  const propertyLines = property.split("\n").length;
  const restLines = rest.split("\n").length;
  // const lines = [firstpartLines, nameLines, propertyLines, restLines];

  const [show, setShow] = useState<number>(0);

  const atMax = show > 2;
  const restart = () => setShow(0);

  return (
    <>
      <div className='flex  flex-col justify-center'>
        <Tabs aria-label='Options' className='justify-center'>
          <Tab
            key='Code'
            title={
              <div className='flex items-center space-x-2'>
                <FontAwesomeIcon icon={faCode} />
                <span>Code</span>
              </div>
            }
          >
            <Card>
              <CardBody className='p-5'>
                <div className='max-w-lg  flex flex-col items-start flex-wrap '>
                  <button
                    className='text-white bg-gray-700 p-2 rounded-md hover:bg-gray-600'
                    onClick={() =>
                      atMax ? restart() : setShow((prev) => prev + 1)
                    }
                  >
                    {atMax ? "Restart" : "Show More"}
                  </button>
                  <div className='relative group'>
                    <Code
                      code={firstpart}
                      animated={true}
                      show={true}
                      maxHeight={firstpartLines * 20}
                    />

                    <Code
                      code={name}
                      animated={true}
                      show={show > 0}
                      maxHeight={nameLines * 20}
                    />

                    <Code
                      code={property}
                      animated={true}
                      show={show > 1}
                      maxHeight={propertyLines * 20}
                    />

                    <Code
                      code={rest}
                      animated={true}
                      show={show > 2}
                      maxHeight={restLines * 20}
                    />
                  </div>
                </div>
              </CardBody>
            </Card>
          </Tab>
          <Tab
            key='quote'
            title={
              <div className='flex items-center space-x-2'>
                <FontAwesomeIcon icon={faBook} />
                <span>Random Quotes</span>
              </div>
            }
          >
            <Card>
              <CardBody>
                <Code
                  code={quote}
                  animated={true}
                  show={true}
                  maxHeight={restLines * 20}
                />
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </>
  );
};
export default AnimatedCode;
