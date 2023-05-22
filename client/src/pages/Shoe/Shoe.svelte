<script>

</script>

<div class="parent">
    <!-- <div class="image">
        <h1>snimka na hui</h1>
    </div> -->
    <img width="512px" height="512px" src="https://asset.kompas.com/crops/U7wPX3XKjxv13BIwG5V7u8xh63M=/0x102:1085x825/750x500/data/photo/2021/08/22/612249c556579.jpg" alt="cactus" >
    <div class="image">
        <img width="160px" height="170px" src="https://zdravnitza.com/images/custom/rqpa2.jpg" alt="hui">
        <img width="160px" height="170px" src="https://zdravnitza.com/images/custom/rqpa2.jpg" alt="hui">
        <img width="160px" height="170px" src="https://zdravnitza.com/images/custom/rqpa2.jpg" alt="hui">
    </div>

    <div class="info-size">
        <div class="info">
            <h1>Brand</h1>
            <h2>name</h2>
            <h2>cena</h2>
            <h3>model</h3>
        </div>

        <div class="sizes">
            <input type="radio" name="size" class="size" id="button1"><label for="button1" class="label-size">41</label>
            <input type="radio" name="size" class="size" id="button2"><label for="button2" class="label-size">42</label>
            <input type="radio" name="size" class="size" id="button3"><label for="button3" class="label-size">40</label>
            <input type="radio" name="size" class="size" id="button4"><label for="button4" class="label-size">69</label>
            <input type="radio" name="size" class="size" id="button5"><label for="button5" class="label-size">60</label> 
            <input type="radio" name="size" class="size" id="button6"><label for="button6" class="label-size">50</label>
            <input type="radio" name="size" class="size" id="button7"><label for="button7" class="label-size">30</label>
            <input type="radio" name="size" class="size" id="button8"><label for="button8" class="label-size">00</label>

        </div>
    </div>
    
    <button>Buy</button>
</div>

<style>

    .parent {
        display: flex;
    }

    .info {
        justify-self: flex-end;
        text-align: center;
    }

    .sizes {
        display: flex;
        flex-wrap: wrap;
        /* flex-direction: column; */
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
        cursor: pointer;
        width: 120px;
        height: 60px;
        margin: 1px;
        position: relative;
        border-radius: 5px;
        border: 1px solid lightgray;
    }   

    .size {
        display: none;
    }

    input[type=radio]:checked + label.label-size{ 
        background-color: ;
    }
   
</style>