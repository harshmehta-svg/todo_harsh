// @flow strict

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserId } from '../store/slices/userSlice.js';

type Props = {
  +children?: React.Node,
  +button_label: string,
  +page: string,
  +handleClick: Function,
  +userId: ?string,
};

const Button = ({
  children,
  button_label,
  page,
  handleClick,
  userId,
}: Props) => {
  const dispatch = useDispatch();
  const stateUserId = useSelector((state) => state.user.id);

  const handleButtonClick = () => {
    dispatch(setUserId(stateUserId));
    handleClick();
  };

  React.useEffect(() => {
    if (!userId) {
      console.error('userId is required for Button component');
    }
  }, [userId]);

  return (
    <button
      type="button"
      onClick={() => {
        globalThis.ga &&
          globalThis.ga('send', 'click', button_label, page, userId);
        handleButtonClick();
      }}
    >
      {children}
    </button>
  );
};

export default Button;