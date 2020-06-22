import React, { useEffect, useState, DOMElement, ReactElement } from 'react';
import { useStore } from 'react-redux';

export interface IWebComponentContainerProps {
  componentSrc: string
  componentClass: string
  elementName: string
  componentProps?: { [key: string]: any }
}

const WebComponentContainer = (props: IWebComponentContainerProps) => {

  const { componentSrc, elementName, componentClass } = props;
  const store = useStore();

  const [Elem, setElem] = useState<ReactElement>(null);

  console.log('Entered WebComponentContainer with componentSrc=', componentSrc, 'className', componentClass, 'elementName', elementName);
  /**
   * import web component source
   * and define custom element
   */
  /*
   useEffect(() => {
   window['import'](componentSrc).then(module => {
   console.log('Imported module');
   console.log('elementName,', module[componentClass].is);

   let defined = window.customElements.get(elementName);
   if (!defined) {
   window.customElements.define(elementName, module[componentClass]);
   } else {
   console.log(`element ${elementName} already defined`);
   }

   const myElement = React.createElement(elementName);
   console.log('Created React Element for customElement', elementName, myElement);
   if (myElement.hasOwnProperty('setStore')) {
   console.log('myElement has setStore function');
   }
   setElem(myElement);
   });
   }, [componentSrc]);
   */

  useEffect(() => {
    const MyElement = React.createElement(elementName, {'assets-path': 'http://localhost:3008/static'});
    console.log('Created React Element for customElement', elementName, MyElement);
    if (MyElement.hasOwnProperty('setStore')) {
      console.log('myElement has setStore function');
    }

    //MyElement.setStore({})
    setElem(MyElement);
  }, [componentSrc]);

  if (Elem) {

    return (
        <div>Defined {Elem}</div>
    );
  } else {
    return (
        <div>Not Defined Yet</div>
    );
  }

};

export default WebComponentContainer;
