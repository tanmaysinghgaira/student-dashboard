let draggedElement = null;

const draggableItems = document.querySelectorAll('.list');
const leftBox = document.getElementById('left');
const rightBox = document.getElementById('right');

draggableItems.forEach(item => {
    item.addEventListener('dragstart', handleDragStart);
    item.addEventListener('dragend', handleDragEnd);
});

[leftBox, rightBox].forEach(zone => {
    zone.addEventListener('dragover', handleDragOver);
    zone.addEventListener('drop', handleDrop);
    zone.addEventListener('dragenter', handleDragEnter);
    zone.addEventListener('dragleave', handleDragLeave);
});

function handleDragStart(e) {
    draggedElement = this;
    this.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.outerHTML);
}

function handleDragEnd(e) {
    this.classList.remove('dragging');
    draggedElement = null;
    
    document.querySelectorAll('.drag-over').forEach(zone => {
        zone.classList.remove('drag-over');
    });
}

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
}

function handleDragEnter(e) {
    e.preventDefault();
    this.classList.add('drag-over');
}

function handleDragLeave(e) {
    if (!this.contains(e.relatedTarget)) {
        this.classList.remove('drag-over');
    }
}

function handleDrop(e) {
    e.preventDefault();
    this.classList.remove('drag-over');
    
    if (draggedElement && this !== draggedElement.parentNode) {
        this.appendChild(draggedElement);
        
        draggedElement.classList.add('dropped');
        setTimeout(() => {
            draggedElement.classList.remove('dropped');
        }, 300);
    }
}

function addMoreItems() {
    const items = ['List Item 5', 'List Item 6', 'List Item 7', 'List Item 8'];
    items.forEach((text, index) => {
        const newItem = document.createElement('div');
        newItem.className = 'list';
        newItem.draggable = true;
        newItem.innerHTML = `<img src="icon.png" alt="icon">${text}`;
        
        newItem.addEventListener('dragstart', handleDragStart);
        newItem.addEventListener('dragend', handleDragEnd);
        
        leftBox.appendChild(newItem);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    addMoreItems();
});