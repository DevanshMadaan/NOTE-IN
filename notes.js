var addnote=document.getElementById("AddNote");
var parent=document.getElementById("div2");
var pop=document.getElementById("pop-up");
var cl=document.getElementById("close");
var cancel=document.getElementById("cancel");
var create=document.getElementById("done");
var topic=document.getElementById("subjecttext");
var content=document.getElementById("addnotetext");
var localData=localStorage.getItem("Notes");
var parentdiv=document.getElementById("mainpopdiv");
var note_data=[];
if(localData){
    note_data=JSON.parse(localData);
}
//Calling fucntion to print stored notes on screen
note_data.forEach(element => {
    addToScreen(element);
});

//Add new Note
addnote.addEventListener("click",function(){
    pop.style.display="block";
});

//Close New Note
cl.addEventListener("click",closepop);
cancel.addEventListener("click",closepop);
function closepop(){
    topic.value="";
content.value="";
    pop.style.display="none";
}

//Create New Note
create.addEventListener("click",function(){
var newNote={
    subject: topic.value,
    content: content.value
}
note_data.push(newNote);
localStorage.setItem("Notes",JSON.stringify(note_data));
addToScreen(note_data[note_data.length-1]);
topic.value="";
content.value="";
pop.style.display="none";
});

//Print Notes on Screen
function addToScreen(text){
    var newdiv=document.createElement("div");
    newdiv.id="newdiv";
    var subdiv=document.createElement("div");
    subdiv.id="subdiv";
    var bt1=document.createElement("button");
    bt1.id="note_edit";
    var img1=document.createElement("img");
    img1.id="img1";
    img1.src="edit icon1.jpg";
    var bt2=document.createElement("button");
    bt2.id="note_del";
    var img2=document.createElement("img");
    img2.id="img2";
    img2.src="delete icon1.jpg";
    var noteHead=document.createElement("h2");
    noteHead.id="noteHeading";
    var bodyText=document.createElement("p");
    bodyText.id="notebody";
    noteHead.innerText=text.subject;
    bodyText.innerText=text.content;
    parent.appendChild(newdiv);
    newdiv.appendChild(noteHead);
    newdiv.appendChild(bodyText);
    newdiv.appendChild(subdiv);
    subdiv.appendChild(bt1);
    bt1.appendChild(img1);
    subdiv.appendChild(bt2);
    bt2.appendChild(img2);
    newdiv.addEventListener("mouseover",function(){
    subdiv.style.display="block";
    });
    newdiv.addEventListener("mouseleave",function(){
        subdiv.style.display="none";
        });
        newdiv.addEventListener("click",function(event){
            if(event.target==noteHead || event.target==bodyText){
            viewNote(noteHead,bodyText);
            }
        })
       
        
        bt1.addEventListener("click",function(event){
        if(event.target!=newdiv){
            editNote(noteHead,bodyText);
        }
        newdiv.remove();
        var index=note_data.indexOf(text);
        note_data.splice(index,1);
        localStorage.setItem("Notes",JSON.stringify(note_data));
        });

        bt2.addEventListener("click",function(event){
            if(event.target!=newdiv){
            newdiv.remove();
            }
            var index=note_data.indexOf(text);
            note_data.splice(index,1);
            localStorage.setItem("Notes",JSON.stringify(note_data));
        })
};

//View Note
function viewNote(Subject,Bodycontext){
var npop=document.createElement("div");
npop.id="npop";
var spop=document.createElement("div");
spop.id="spop";
    var nh=document.createElement("h1");
    nh.id="nh1";
    nh.innerText=Subject;
var nc=document.createElement("p");
nc.id="p1";
nc.innerText=Bodycontext;
var bt3=document.createElement("span");
bt3.id="bt3";
bt3.innerText="×";
parentdiv.appendChild(npop);
npop.appendChild(spop);
spop.appendChild(bt3);
spop.appendChild(nh);
spop.appendChild(nc);
npop.style.display="block";
bt3.addEventListener("click",function(){
npop.style.display="none";
});
}

//Edit Note
function editNote(Subject,Bodycontext){
    var ndiv=document.createElement("div");
    ndiv.id="pop-up1";
    var subndiv=document.createElement("div");
    subndiv.id="sub-pop1";
    var back=document.createElement("span");
    back.id="close1";
    back.innerText="×";
    var inp1=document.createElement("input");
    inp1.id="subjecttext1";
    inp1.type="text";
    inp1.value=Subject.innerText;
    var inp2=document.createElement("textarea");
    inp2.id="addnotetext1";
    inp2.value=Bodycontext.innerText;
    var ok=document.createElement("button");
    ok.innerText="OK";
    ok.id="done1";
parentdiv.appendChild(ndiv);
ndiv.appendChild(subndiv);
subndiv.appendChild(back);
subndiv.appendChild(inp1);
subndiv.appendChild(inp2);
subndiv.appendChild(ok);
ndiv.style.display="block";

// Add changes
ok.addEventListener("click",function(){
    var newNote={
        subject: inp1.value,
        content: inp2.value
    }
    note_data.push(newNote);
    localStorage.setItem("Notes",JSON.stringify(note_data));
    addToScreen(note_data[note_data.length-1]);
    ndiv.style.display="none";
});

//Close editor
back.addEventListener("click",function(){
    var newNote={
        subject: Subject.innerText,
        content: Bodycontext.innerText
    }
    note_data.push(newNote);
    localStorage.setItem("Notes",JSON.stringify(note_data));
    addToScreen(note_data[note_data.length-1]);
    ndiv.style.display="none";
});
}
