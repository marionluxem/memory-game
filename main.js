let objects = ['hand-paper-o', 'hand-paper-o', 'hand-lizard-o', 'hand-lizard-o', 'hand-peace-o', 'hand-peace-o', 'thumbs-o-up', 'thumbs-o-up', 'hand-scissors-o', 'hand-scissors-o', 'hand-spock-o', 'hand-spock-o'],
// let objects = ['hand-o-left', 'hand-o-left', 'hand-paper-o', 'hand-paper-o'],

//jQuery shortcuts
$container = $('.container'),
$scoreHeader = $('.score-header'),
$rating = $('.fa-star'),
$moves = $('.moves'),
$timer = $('.timer'),
$startButton = $('.start-button'),
// $restartContainer = $('.restart-container'),
$deck = $('.deck'),
$subheading = $('.subheading'),
$modal = $('#modal'),
$movesModal = ('#moves.modal'),
$secondsModal = ('#seconds.modal'),
$scoreModal = ('#score.modal'),

nowTime,
allOpen = [],
match = 0,
second = 0,
moves = 0,
wait = 420,
totalCard = objects.length / 2,

stars3 = 10,
stars2 = 12,
star1 = 16;

function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

  $startButton.click(function init() {
    let allCards = shuffle(objects);
    $deck.empty();

    match = 0;
    moves = 0;
    $moves.text('0');

    for (let i = 0; i < allCards.length; i++) {
        $deck.append($('<li class="card"><i class="fa fa-' + allCards[i] + '"></i></li>'))
    }
    addCardListener();

    resetTimer(nowTime);
    second = 0;
    $timer.text(`${second}`)
    initTime();
    $startButton.remove();

})

function rating(moves) {
    let rating = 3;
    if (moves > stars3 && moves < stars2) {
        $rating.eq(3).removeClass('fa-star').addClass('fa-star-o');
    } else if (moves > stars2 && moves < star1) {
        $rating.eq(2).removeClass('fa-star').addClass('fa-star-o');
    } else if (moves > star1) {
        $rating.eq(1).removeClass('fa-star').addClass('fa-star-o');
        rating = 1;
    }
    return { score: rating };
}

$('.restart-container').click(function init() {
    let allCards = shuffle(objects);
    $deck.empty();

    match = 0;
    moves = 0;
    $moves.text('0');

    for (let i = 0; i < allCards.length; i++) {
        $deck.append($('<li class="card"><i class="fa fa-' + allCards[i] + '"></i></li>'))
    }
    addCardListener();

    resetTimer(nowTime);
    second = 0;
    $timer.text(`${second}`)
    initTime();
})

let addCardListener = function () {
    $deck.find('.card').bind('click', function () {
        let $this = $(this);

        if ($this.hasClass('show') || $this.hasClass('match')) { return true; }


        let card = $this.context.innerHTML;
        $this.addClass('open show');
        allOpen.push(card);

        if (allOpen.length > 1) {
            if (card === allOpen[0]) {
                $deck.find('.open').addClass('match');
                setTimeout(function () {
                    $deck.find('open').removeClass('open show');
                    $(".deck .card.match").fadeOut(500).hide();
                    // $(".deck .card.match").remove();
                }, wait);
            match++;
            

            } else {
            $deck.find('.open').addClass('notmatch');
            setTimeout(function () {
                $deck.find('.open').removeClass('open show');
            }, wait / 1.5);
            }

            allOpen = [];
            moves++;
            rating(moves);
            $moves.html(moves);
        }
            if (totalCard === match) {
                clearInterval(nowTime);
                $('.restart-container').hide();
                let score = rating(moves).score;
                $modal.removeClass(`hide`);
                $('#moves-modal').text(`${moves}`);
                $('#seconds-modal').text(`${second}`);
                $('#score-modal').text(`${score}`);
                // alert(`YOU WIN! You made a total of ${moves} moves in ${second} seconds with a score of ${score} stars. Woohoo!`);
            }
    });
}

function initTime() {
    nowTime = setInterval(function () {
        $timer.text(`${second}`)
        second = second + 1
    }, 1000);
}

function resetTimer(timer) {
    if (timer) {
        clearInterval(timer);
    }
}

$('.play-again-container').click(function init() {
    $modal.addClass(`hide`);
    $('.restart-container').show();
    let allCards = shuffle(objects);
    $deck.empty();

    match = 0;
    moves = 0;
    $moves.text('0');

    for (let i = 0; i < allCards.length; i++) {
        $deck.append($('<li class="card"><i class="fa fa-' + allCards[i] + '"></i></li>'))
    }
    addCardListener();

    resetTimer(nowTime);
    second = 0;
    $timer.text(`${second}`)
    initTime();
})