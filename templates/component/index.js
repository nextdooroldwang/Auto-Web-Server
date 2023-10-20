const { toComponentName } = require("../../utils/objects/file");

function baseComponent(fileName) {
  const componentname = toComponentName(fileName);
  return `
import use${componentname} from '@/hook/controller/${fileName}/use${componentname}';

export default function ${componentname}Component () {
    const {}=use${componentname}();

    return <></>;
}
    `;
}

function createComponent(fileName) {
  const componentname = toComponentName(fileName);
  return `
  import useCreate${componentname} from '@/hook/controller/${fileName}/useCreate${componentname}';
  
  export default function ${componentname}CreateComponent () {
      const {}=useCreate${componentname}();
  
      return <></>;
  }
      `;
}

function detailComponent(fileName) {
  const componentname = toComponentName(fileName);
  return `
  import use${componentname}Detail from '@/hook/controller/${fileName}/use${componentname}Detail';
  
  type Props = {
    id: string;
  };

  export default function ${componentname}DetailComponent ({ id }: Props) {
      const {}=use${componentname}Detail(id);
  
      return <></>;
  }
      `;
}

module.exports = {
  baseComponent,
  createComponent,
  detailComponent,
};
