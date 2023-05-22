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
            <label class="label-size">41<input type="radio" name="size" class="size"></label>
            <label class="label-size">42<input type="radio" name="size" class="size"></label>
            <label class="label-size">40<input type="radio" name="size" class="size"></label>
            <label class="label-size">69<input type="radio" name="size" class="size"></label>
            <label class="label-size">60<input type="radio" name="size" class="size"></label> 
            <label class="label-size">50<input type="radio" name="size" class="size"></label>
            <label class="label-size">30<input type="radio" name="size" class="size"></label>
            <label class="label-size">00<input type="radio" name="size" class="size"></label>

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
        
    }

    input[type=radio]:hover{
        background-color: red;

    }
   
</style>