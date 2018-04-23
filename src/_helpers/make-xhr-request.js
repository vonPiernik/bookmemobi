// function that allows to make and XMLHttpRequest and return promise
export function makeXHRRequest(method, url, token, data) {
    return new Promise(function (resolve, reject) {
        // let progressIndicator = document.getElementById("progressIndicator");
        // progressIndicator.innerHTML = "";
        // progressIndicator.classList.remove("complete");

        var xhr = new XMLHttpRequest();
        xhr.upload.addEventListener("progress", function(evt){
            if (evt.lengthComputable) {
              onProgress(evt)
            }
          }, false);
        // xhr.onprogress = onProgress;
        xhr.open(method, url, true);
        xhr.setRequestHeader("Authorization", token);
        xhr.onload = function(){
            return resolve(xhr);
        };
        xhr.onerror = reject;
        xhr.send(data);
    });
}

function onProgress(e) {
    let progressIndicator = document.getElementById("progressIndicator");
    let percentComplete = Math.round( (e.loaded / e.total) * 100 );
    progressIndicator.innerHTML = "<span>" + percentComplete + "%" + "</span>";
    progressIndicator.style.width = percentComplete + "%";
    // if(percentComplete === 100){
    //     progressIndicator.classList.add("complete");
    // }
}