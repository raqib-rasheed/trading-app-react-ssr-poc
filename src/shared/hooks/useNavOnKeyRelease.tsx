import { KeyboardEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';
import type { To } from 'react-router-dom';

function useNavOnKeyRelease() {
  const navigate = useNavigate();

  const handleKeyUp =
    (path: To): KeyboardEventHandler<HTMLAnchorElement> =>
    (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        navigate(path);
      }
    };

  return handleKeyUp;
}

export default useNavOnKeyRelease;
