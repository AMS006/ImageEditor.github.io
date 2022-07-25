const chooseImg = document.querySelector(".btn-choose button"),
content = document.querySelector(".content"),
chooseFile = document.querySelector(".btn-choose input"),
previewImg = document.querySelector(".preview-img-box img"),
filterbtn = document.querySelectorAll(".filter-btn button"),
filterText = document.querySelector(".range-text"),
resetFilter = document.querySelector("#reset-filter"),
saveImg = document.querySelector("#save-img"),
filterRange = document.querySelector(".range-value input"),
rangeValue = document.querySelector(".range-percent p"),
rotatebtn = document.querySelectorAll(".rotate-btn button"),
resetFilterbtn = document.querySelector("#reset-filter button"),
saveImgbtn = document.querySelector("#save-img button")
console.log(filterbtn);
let brightness = 100,saturation = 100, grayscale = 0,inversion = 0,rotate = 0,horizontalFlip=1,verticalFlip=1;

const loadImage = () =>{
    let file = chooseFile.files[0];
    if(file.length) return;
    previewImg.src = URL.createObjectURL(file);
    content.classList.remove("disable")
    resetFilter.classList.remove("disable")
    saveImg.classList.remove("disable");

}
filterbtn.forEach(option =>{
    option.addEventListener("click",()=>{
       document.querySelector(".active").classList.remove("active");
       option.classList.add("active");
       filterText.innerText = option.innerText;
       if(option.innerText === "Brightness"){
            filterRange.max = "200";
            filterRange.value = brightness;
            rangeValue.innerText = `${brightness}%`;
        }
        else if(option.innerText === "Saturation"){
            filterRange.max = "200";
            filterRange.value = saturation;
            rangeValue.innerText = `${saturation}%`;
        }
        else if(option.innerText === "Inversion"){
            filterRange.max = "100";
            filterRange.value = inversion;
            rangeValue.innerText = `${inversion}%`;
       }
       else{
            filterRange.max = "100";
            filterRange.value = grayscale;
            rangeValue.innerText = `${grayscale}%`;
        }
    })
});
rotatebtn.forEach(option =>{
    option.addEventListener("click",()=>{
        console.log(option)
        if(option.id =="left"){
            rotate -= 90;
        }
        else if(option.id == "right"){
            console.log("right button clicked")
            rotate += 90;
        }
        else if(option.id == "horizontalFlip"){
            horizontalFlip = horizontalFlip==1 ? -1:1;
        }
        else{
            verticalFlip = verticalFlip==1 ?-1:1;
        }
        applyFilters();
    })
});
const applyFilters = () =>{
    previewImg.style.transform = `rotate(${rotate}deg) scale(${horizontalFlip},${verticalFlip})`;
    previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`
    console.log("Filter applied",rotate)
}
const updateFilter = () =>{
    rangeValue.innerText = `${filterRange.value}%`;
    const selectedFilter = document.querySelector(".filter-btn button.active");
    if(selectedFilter.innerText === "Brightness"){
        brightness = filterRange.value;
    }
    else if(selectedFilter.innerText === "Saturation"){
        saturation = filterRange.value;
    }
    else if(selectedFilter.innerText === "Inversion"){
        inversion = filterRange.value;
    }
    else{
        grayscale = filterRange.value;
    }
    applyFilters();
}
const resetFilters = () =>{
    brightness = 100,saturation = 100,inversion =0,grayscale = 0, rotate = 0, horizontalFlip =1 , verticalFlip = 1;
    applyFilters();
    filterbtn[0].click();
}
const saveImage = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = previewImg.naturalWidth;
    canvas.height = previewImg.naturalHeight;
    
    ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    if(rotate !== 0) {
        ctx.rotate(rotate * Math.PI / 180);
    }
    ctx.scale(horizontalFlip, verticalFlip);
    ctx.drawImage(previewImg, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    
    const link = document.createElement("a");
    link.download = "image.jpg";
    link.href = canvas.toDataURL();
    link.click();
}
chooseImg.addEventListener("click",()=>chooseFile.click());
chooseFile.addEventListener("change",loadImage);
filterRange.addEventListener("input",updateFilter);
resetFilterbtn.addEventListener("click",resetFilters);
saveImgbtn.addEventListener("click",saveImage);

