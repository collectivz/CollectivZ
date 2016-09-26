import React                from 'react';
import { render, unmountComponentAtNode } from 'react-dom';

import Toastr from '../components/Toastr';

export function Toast(content, color) {
  render((<Toastr content={content} color={color} displayCall={true}/>), document.getElementById('notifications-container'));

  setTimeout(() => {
    unmountComponentAtNode(document.getElementById('notifications-container'));
  }, 5000);
};
