<script>
    let brand;
    let name;
    let price;
    let model;
    let image

    fetch("http://localhost:8080/shoes/:model", {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-type": "application/json",
        },
    })
    .then((response) => response.json)
    .then((data) =>{
        brand = data.brand;
        name = data.name;
        price = data.price;
        // model = model.value;
        // image = image.value
    })

    let mainImgSrc = 'https://asset.kompas.com/crops/U7wPX3XKjxv13BIwG5V7u8xh63M=/0x102:1085x825/750x500/data/photo/2021/08/22/612249c556579.jpg';
    let smallImg1Src = 'https://d3d173w0vohr0k.cloudfront.net/bg-bg/vegetables/1518693974/cartofi-1508336223_tmb_tmb.jpg'
    let smallImg2Src = 'https://zdravnitza.com/images/custom/rqpa2.jpg';
    let smallImg3Src = 'https://genkoenchev.com/image/cache/kategorii/patladjan1-600x315.jpg';


    function swap1() {
        [smallImg1Src, mainImgSrc] = [mainImgSrc, smallImg1Src];
    }

    function swap2() {
        [smallImg2Src, mainImgSrc] = [mainImgSrc, smallImg2Src];
    }

    function swap3() {
        [smallImg3Src, mainImgSrc] = [mainImgSrc, smallImg3Src];
    }
</script>

<div class="parent">
    <img width="512px" height="512px" src="{mainImgSrc}" alt="cactus" >
    <div class="image">
        <img width="160px" height="170px" src="{smallImg1Src}" on:click={swap1}  alt="hui">
        <img width="160px" height="170px" src="{smallImg2Src}" on:click={swap2} alt="hui">
        <img width="160px" height="170px" src="{smallImg3Src}" on:click={swap3} alt="hui">
    </div>

    <div class="info-size">
        <div class="info">
            <h1>{brand}</h1>
            <h2>{name}</h2>
            <h2>{price}</h2>
            <h3>{model}</h3>
        </div>

        <div class="sizes">
            <input type="radio" name="size" class="size" id="button1"><label for="button1" class="label-size">EU 38</label>
            <input type="radio" name="size" class="size" id="button2"><label for="button2" class="label-size">EU 39</label>
            <input type="radio" name="size" class="size" id="button3"><label for="button3" class="label-size">EU 40</label>
            <input type="radio" name="size" class="size" id="button4"><label for="button4" class="label-size">EU 41</label>
            <input type="radio" name="size" class="size" id="button5"><label for="button5" class="label-size">EU 42</label> 
            <input type="radio" name="size" class="size" id="button6"><label for="button6" class="label-size">EU 43</label>
            <input type="radio" name="size" class="size" id="button7"><label for="button7" class="label-size">EU 44</label>
            <input type="radio" name="size" class="size" id="button8"><label for="button8" class="label-size">EU 45</label>

        </div>
    </div>
</div>
<div id="button-wrapper">
    <button>Buy</button>
</div>
<style>

    .parent {
        font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
        display: flex;
        color: #2f3e46;
    }

    .info {
        justify-self: flex-end;
        text-align: center;
    }

    .sizes {
        display: flex;
        flex-wrap: wrap;
        margin-left: 20px;
    }

    .info-size {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
    }

    .image {
        display: flex;
        flex-direction: column;
    }

    .label-size {
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        width: 120px;
        height: 60px;
        margin: 1px;
        position: relative;
        border-radius: 5px;
        font-size: 20px;
        border: 1px solid #cce3de;
    }   
    #button-wrapper
    {
        display: flex;
        justify-content: right;
        margin-top: -10vh;
        margin-right: 18vw;
    }
    button
    {
        background-color: #cce3de;
        width: 220px;
        height: 50px;
        border: 1px solid #a4c3b2;
        border-radius: 8px;
        font-size: 16px;
    }
    button:hover
    {
        background-color: #a4c3b2;
        cursor: pointer;
        border: 1px solid #a4c3b2;
    }
    .size {
        display: none;
    }

    input[type=radio]:checked + label.label-size{ 
        border: 1px solid #a4c3b2
    }

    input[type=radio]:hover + label.label-size
    {
        background-color: #cce3de;
    }

    img {
        cursor: pointer;
    }
</style>