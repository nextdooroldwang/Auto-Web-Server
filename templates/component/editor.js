function editorPage(path) {
  return `
import DartComponent from '@${path}/__dart';

function SampleEditorPage () {
    return (
    <div className="page">
        <DartComponent />
    </div>
    );
}

export default SampleEditorPage;
            
                `;
}

module.exports = {
  editorPage,
};
