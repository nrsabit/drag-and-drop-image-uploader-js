// DOM's
let dragArea = document.querySelector('.app-body');
let input = dragArea.querySelector('input');
let hadding = dragArea.querySelector('h3');
let button = dragArea.querySelector('button');
let myFile;

// Classes
class Uploader{
    static inputClick = ()=>{
        input.click();
    }

    static upload = (e) =>{
        myFile = e.target.files[0];
        dragArea.classList.add('active');
        this.showFile();
    }

    static dragOver = (e) =>{
        e.preventDefault();
        dragArea.classList.add('active');
        hadding.textContent = 'Release to Upload File';
    }

    static dragLeave = () =>{
        dragArea.classList.remove('active');
        hadding.textContent = 'Drag and Drop';
    }

    static dropFile = (e) => {
        e.preventDefault();
        myFile = e.dataTransfer.files[0];
        this.showFile();
    }

    static showFile = () =>{
        let fileType = myFile.type;
        let validation = ['image/jpeg', 'image/jpg', 'image/png'];
        if(validation.includes(fileType)){
            let fileReader = new FileReader();
            fileReader.onload = () => {
                let imageUrl = fileReader.result;
                let img = `<img src="${imageUrl}">`;
                dragArea.innerHTML = img;
            }
            fileReader.readAsDataURL(myFile);
        }else{
            alert('Invalid File type: Please Select Only Images');
            dragArea.classList.remove('active');
            hadding.textContent = 'Drag and Drop';
        }
    }
}

// Event Listeners
button.addEventListener('click', Uploader.inputClick);
input.addEventListener('change', Uploader.upload);
dragArea.addEventListener('dragover', Uploader.dragOver);
dragArea.addEventListener('dragleave', Uploader.dragLeave);
dragArea.addEventListener('drop', Uploader.dropFile);