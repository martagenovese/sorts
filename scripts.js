const canvas1 = document.getElementById('sortingCanvas1');
const ctx1 = canvas1 ? canvas1.getContext('2d') : null;
const canvas2 = document.getElementById('sortingCanvas2');
const ctx2 = canvas2 ? canvas2.getContext('2d') : null;
const canvas3 = document.getElementById('sortingCanvas3');
const ctx3 = canvas3 ? canvas3.getContext('2d') : null;

if (!canvas1 || !canvas2 || !canvas3 || !ctx1 || !ctx2 || !ctx3) {
    throw new Error("One or more canvases are missing in the HTML.");
}

let array1 = [];
let array2 = [];
let array3 = [];
const arraySize = 50;

function updateCanvasSizes() {
    const canvasWidth = window.innerWidth / 4;
    canvas1.width = canvasWidth;
    canvas2.width = canvasWidth;
    canvas3.width = canvasWidth;
    const barWidth = canvasWidth / arraySize;
    generateArray(barWidth);
}

function generateArray(barWidth) {
    array1 = [];
    array2 = [];
    array3 = [];
    for (let i = 0; i < arraySize; i++) {
        const value = Math.floor(Math.random() * canvas1.height);
        array1.push(value);
        array2.push(value);
        array3.push(value);
    }
    drawArray(ctx1, array1, barWidth);
    drawArray(ctx2, array2, barWidth);
    drawArray(ctx3, array3, barWidth);
}

function drawArray(ctx, array, barWidth, highlightedIndices = []) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    for (let i = 0; i < array.length; i++) {
        ctx.fillStyle = highlightedIndices.includes(i) ? 'red' : 'blue';
        ctx.fillRect(i * barWidth, ctx.canvas.height - array[i], barWidth, array[i]);
    }
}

async function bubbleSort(array, ctx, barWidth) {
    const startTime = performance.now();
    let len = array.length;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                drawArray(ctx, array, barWidth, [j, j + 1]);
                await sleep(50);
            }
        }
    }
    const endTime = performance.now();
    document.getElementById('bubbleSortTime').innerText = `Time Taken: ${(endTime - startTime).toFixed(2)} ms`;
}

async function selectionSort(array, ctx, barWidth) {
    const startTime = performance.now();
    let len = array.length;
    for (let i = 0; i < len; i++) {
        let minIndex = i;
        for (let j = i + 1; j < len; j++) {
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            [array[i], array[minIndex]] = [array[minIndex], array[i]];
            drawArray(ctx, array, barWidth, [i, minIndex]);
            await sleep(50);
        }
    }
    const endTime = performance.now();
    document.getElementById('selectionSortTime').innerText = `Time Taken: ${(endTime - startTime).toFixed(2)} ms`;
}

async function insertionSort(array, ctx, barWidth) {
    const startTime = performance.now();
    let len = array.length;
    for (let i = 1; i < len; i++) {
        let key = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            drawArray(ctx, array, barWidth, [j, j + 1]);
            await sleep(50);
            j--;
        }
        array[j + 1] = key;
        drawArray(ctx, array, barWidth, [j + 1]);
        await sleep(50);
    }
    const endTime = performance.now();
    document.getElementById('insertionSortTime').innerText = `Time Taken: ${(endTime - startTime).toFixed(2)} ms`;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

window.addEventListener('resize', updateCanvasSizes);
updateCanvasSizes();
bubbleSort(array1, ctx1, canvas1.width / arraySize);
selectionSort(array2, ctx2, canvas2.width / arraySize);
insertionSort(array3, ctx3, canvas3.width / arraySize);