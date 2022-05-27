class Sudoku{
    constructor(){
        this.board=this.blank_array_board();
    }
    blank_array_board(){
        return [
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0]
        ]
    }  
    
    
    //Inializing the Game 
    setGame(board_string){
        if ( ! board_string.match(/^\d{81}$/m) ) {
            this.board = this.blank_board_array();
            return; 
        }
        for ( let row = 0; row <= 8; row++ ) {
            for ( let column = 0; column <= 8; column++ ) {
                this.board[row][column] = board_string.charAt(row*9+column);
            }
        }
    }
    get_board_array() {
        return this.board;
    }
    


    make_move(row, col, value) {
        this.board[row][col] = value;
    }
        is_legal_move(row,col,value){
                    if(!value.match(/^[1-9]$/m)){
                        return false
                    }
                    //checking rows
                    for ( let i = 0; i <= 8; i++ ) {
                        if ( value == this.board[row][i] ) {
                            return false;
                        }
                    }
                    //checking col
                    for ( let i = 0; i <= 8; i++ ) {
                        if ( value == this.board[i][col] ) {
                            return false;
                        }
                    }
                    //   checking 3*3 Grid
                    let row_offset = Math.floor(row/3)*3;
                    let col_offset = Math.floor(col/3)*3;
                    for ( let i = 0 + row_offset; i <= 2 + row_offset; i++ ) {
                        for ( let j = 0 + col_offset; j <= 2 + col_offset; j++ ) {
                            if(value==this.board[i][j]){   
                                return false        
                            }
                        }
                    }
                    return true  
        }
    

}






let game=new Sudoku
let key =["080100007000070960026900130000290304960000082502047000013009840097020000600003070","000001230123008040804007650765000000000000000000000123012300804080400765076500000","400801900030000850608730001060309040903000602050406010200058704074000060006204005", "390001000540068013001070950089053047000000000610490230034010800750830024000600079","820600905000000000000020310007318060240000073000000000002790100500080036003000000","400000805030000000000700000020000060000080400000010000000603070500200000104000000","000001230123008040804007650765000000000000000000000123012300804080400765076500000","100007090030020008009600500005300900010080002600004000300000010040000007007000300","602050000000004030000000000430008000010000200000000700500270000000000081000600000"]
let import_handle=document.getElementById("import")
const m = 9;
const  n = 9;
let sudoku_squre = new Array(m); // create an empty array of length n

for (var i = 0; i < m; i++) {
    sudoku_squre[i] = new Array(n); // make each element an array
}

//Setting up the game
import_handle.addEventListener('mouseup',function(){
    let v= document.getElementsByName("import_string")[0].value
    if(v==0){
        alert("Please Select the level in Range of 1-9")
    }
    else{
        import_string=key[v-1]
        game.setGame(import_string);
        print_sudoku_to_webpage(game);
    }
    
    
})




for ( let row = 0; row <= 8; row++ ) { // Assigning each block to sudoku_squre
    for ( let col = 0; col <= 8; col++ ) {
 sudoku_squre[row][col] = document.getElementsByClassName('sudoku')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[row].getElementsByTagName('td')[col].getElementsByTagName('input')[0];
    }}


for ( let row = 0; row <= 8; row++ ) { // assigning function on each sudoku_squre
for ( let col = 0; col <= 8; col++ ) {
     sudoku_squre[row][col].addEventListener('input', function(e){
       if(!game.is_legal_move(row,col,e.target.value) ){
           e.target.value=''
           sudoku_squre[row][col].style.backgroundColor='red'
       }
       else{
        game.make_move(row,col,e.target.value)
        sudoku_squre[row][col].style.backgroundColor='green'
           
       }
          
        
     })
    }
    function print_sudoku_to_webpage(sudoku_object) {
        let board = sudoku_object.get_board_array();
        clear_webpage_board();
        for ( let row = 0; row <= 8; row++ ) {
            for ( let col = 0; col <= 8; col++ ) {
                if ( board[row][col] != 0 ) {
                    let input = sudoku_squre[row][col];
                    input.value = board[row][col];
                    input.readOnly = true;
                    input.classList.add('imported_square');
                }
            }
        }
    }
    function clear_webpage_board() {
        for ( let row = 0; row <= 8; row++ ) {
            for ( let col = 0; col <= 8; col++ ) {
                sudoku_squre[row][col].value = "";
                sudoku_squre[row][col].classList.remove('imported_square');
            }
        }
    }
    }