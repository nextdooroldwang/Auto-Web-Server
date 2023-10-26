const { toCamelCase, toComponentName } = require("../../utils/objects/file");

function createLayout(layout) {
  console.log(layout);
  const componentname = toComponentName(layout);
  return `
import ${componentname} from '@/layout/${layout}';

export default function Layout() {
  return <${componentname} />;
}

  `;
}

function basePage(fileName) {
  const name = toCamelCase(fileName);
  const componentname = toComponentName(fileName);
  return `
import ${componentname}Component from '@/components/${name}';

function ${componentname}Page () {
  return (
    <div className="page">
      <${componentname}Component />
    </div>
  );
}

export default ${componentname}Page;

    `;
}

function createPage(fileName) {
  const name = toCamelCase(fileName);
  const componentname = toComponentName(fileName);
  return `
import ${componentname}CreateComponent from '@/components/${name}/create';

function ${componentname}CreatePage () {
  return (
    <div className="page">
      <${componentname}CreateComponent />
    </div>
  );
}

export default ${componentname}CreatePage;

    `;
}

function detailPage(fileName) {
  const name = toCamelCase(fileName);
  const componentname = toComponentName(fileName);
  return `
import ${componentname}DetailComponent from '@/components/${name}/detail';
import { getPathId } from '@/util/object';
import { useLocation } from 'react-router-dom';

function ${componentname}DetailPage () {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <div className="page">
      <${componentname}DetailComponent id={getPathId(pathname)}/>
    </div>
  );
}

export default ${componentname}DetailComponent;
    `;
}

module.exports = {
  createLayout,
  basePage,
  createPage,
  detailPage,
};
