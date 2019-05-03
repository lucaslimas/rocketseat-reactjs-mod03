import { toast } from 'react-toastify';

export const Types = {
  REQUEST: 'developers/request',
  SUCCESS: 'developers/request_success',
  REMOVE: 'developers/remove',
  ERROR: 'developers/error',
};

const INITIAL_STATE = [];

export default function developers(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.SUCCESS:
      toast.success('Desenvolvedor Adicionado com Sucesso', {
        position: toast.POSITION.TOP_RIGHT,
      });

      return [...state, action.payload.developer];

    case Types.REMOVE:
      toast.success('Desenvolvedor Removido com Sucesso', {
        position: toast.POSITION.TOP_RIGHT,
      });

      return state.filter(developer => developer.id !== action.payload.id);

    case Types.ERROR:
      toast.error(action.payload.msg, {
        position: toast.POSITION.TOP_RIGHT,
      });

      return state;

    default:
      return state;
  }
}

export const Actions = {
  addDeveloperRequest: (repositoryPath, cordinates) => ({
    type: Types.REQUEST,
    payload: { repositoryPath, cordinates },
  }),

  addDeveloperSuccess: developer => ({
    type: Types.SUCCESS,
    payload: { developer },
  }),

  removeDeveloper: id => ({
    type: Types.REMOVE,
    payload: { id },
  }),

  developerError: (msg, err) => ({
    type: Types.ERROR,
    payload: { msg, err },
  }),
};
