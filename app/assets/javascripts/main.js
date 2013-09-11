$(document).ready(function(){

    // Get reference for the textarea element on the page to perform text statistics on.
    var textAreaName = $("#msg");

    var sampleText = "The Dale-Chall Readability Formula was inspired by Rudolph Flesch's Flesch–Kincaid readability test which used word to determine how difficult a word was for readers to understand. Edgar Dale and Jeanne Chall instead used a list of 763 words that 80% of fourth-grade students were familiar with to determine which words were difficult. The Dale-Chall Readability Formula was originally published in their 1948 article A Formula for Predicting Readability[1] and updated in 1995 in Readability Revisited: The New Dale-Chall Readability Formula, which expanded the word list to 3,000 familiar words.";

    //$(textAreaName).on('mouseover', function() {
    $(".text-statistics").on('mouseover', function() {

        //***** SETTINGS *****

        // Get a reference to the OL list element.
        var wordList = $("#list");
        wordList.html("");

        // Get references to elements on the page and declare as variables for plugin user flexibility
        //
        // character count element on the page
        var cCount = $("#character-count");
        // word count element
        var wCount = $("#word-count");
        // sentence count element
        var senCount = $("#sentence-count");
        // syllable count element
        var sylCount = $("#syllable-count");
        // average characters per word element
        var avgCharPW = $("#avg-characters-per-word");
        // average characters per sentence element
        var avgCharPS = $("#avg-characters-per-sentence");
        // average words per sentence element
        var avgWordsPS = $("#avg-words-per-sentence");
        // average syllables per word element
        var avgSylPW = $("#avg-syllables-per-word");
        // Automated Readability Index element
        var aRI = $("#automated-readability-index");
        // Coleman Liau Index element
        var cLI = $("#coleman-liau-index");
        // Fleisch-Kincaid Reading Ease element
        var fKRE = $("#flesch-kincaid-reading-ease");
        // Fleisch-Kincaid Grade Level element
        var fKGL = $("#flesch-kincaid-grade-level");
        //
        //***** END SETTINGS *****

        // Create raw array from text in textarea
        var textString = $(textAreaName).val();

        // cleanup raw text array
        var removeCommasInNumbers = textString.replace(/\,/g,'');
        var cleanText = removeCommasInNumbers.replace(/[^a-zA-Z 0-9']+/g,' ').trim();
        cleanText = cleanText.replace(/\s+/g,' ');

        // rough syllable count
        var syllableCount = cleanText.split(/.[aeiouy]+/i).length;

        // create character array
        var characters = cleanText.replace(/\s+/g,'');

        // count characters
        var characterCount = characters.length;

        // create usable array from cleaned up text to count words
        var textArray = cleanText.split(' ');

        // calculate number of words
        if (textString.length == '') {
            var wordCount = 0;

        } else {
            var wordCount = textArray.length;
        }

        // calculate the number of sentences
        var textForSentenceCount = textString.trim();
        //
        if (textString.length == '') {
            var sentenceCount = 0;

        } else {
            var sentenceCount = textForSentenceCount.split(/[\.\?\!]\s/).length;
        }

        // calculate the average number of characters per word
        if (characterCount == 0) {
            var avgCharactersPerWord = 0
        }  else {
            var avgCharactersPerWord = (characterCount / wordCount);
        }

        // calculate the average syllables per word
        if (characterCount == 0) {
             var avgSyllablesPerWord = 0;
        }   else {
             var avgSyllablesPerWord = (syllableCount / wordCount);
        }

        // calculate the average number of characters per sentence
        if (characterCount == 0) {
            var avgCharactersPerSentence = 0;
        }   else {
            var avgCharactersPerSentence = (characterCount / sentenceCount);
        }

        // calculate the average number of words per sentence
        if (characterCount == 0) {
            var avgWordsPerSentence = 0;
        }   else {
            var avgWordsPerSentence = (wordCount / sentenceCount);
        }

        // calculate Automated Readablity Index
        if (characterCount == 0) {
            var automatedReadabilityIndex = 0;
        }   else {
            var automatedReadabilityIndex = (((4.71 * (characterCount / wordCount)) + (0.5 * (wordCount / sentenceCount)) - 21.43).toPrecision(4));
        }
        // calculate Coleman Liau Index
        if (characterCount == 0) {
            var colemanLiauIndex = 0;
        }   else {
            var colemanLiauIndex = (((5.88 * (characterCount / wordCount)) - (0.296 * (sentenceCount / wordCount)) - 15.8).toPrecision(4));
        }

        // calculate Flesch Kincaid Reading Ease
        if (characterCount == 0) {
            var fleschKincaidReadingEase = 0;
        }   else {
            var fleschKincaidReadingEase = (((206.835 - (1.015 * avgWordsPerSentence)) - (84.6 * avgSyllablesPerWord)).toPrecision(4));
        }

        // calculate Flesch Kincaid Grade Level
        if (characterCount == 0) {
            var fleschKincaidGradeLevel = 0;
        }   else {
            var fleschKincaidGradeLevel = (((0.39 * avgWordsPerSentence) + (11.8 * avgSyllablesPerWord) - 15.59).toPrecision(4));
        }

        // assign values to elements on the page
        $(cCount).html(characterCount);
        $(wCount).html(wordCount);
        $(senCount).html(sentenceCount);
        $(sylCount).html(syllableCount-1);

        $(avgCharPW).html((avgCharactersPerWord).toFixed(2));
        $(avgSylPW).html((avgSyllablesPerWord).toFixed(2));
        $(avgCharPS).html((avgCharactersPerSentence).toFixed(2));
        $(avgWordsPS).html((avgWordsPerSentence).toFixed(2));

        $(aRI).html(automatedReadabilityIndex);
        $(cLI).html(colemanLiauIndex);
        $(fKRE).html(fleschKincaidReadingEase);
        $(fKGL).html(fleschKincaidGradeLevel);


        // create word array
        // Loop over each word in the array and add 1 to it's counter if unique
        // and add 1 to the word's counter if it's already there.
        var countWords = {};

        for (var x = 0; x < textArray.length; x++) {
            var word = textArray[x].toLowerCase();
            if (typeof(countWords[word]) == "undefined") {
                countWords[word] = 1;
            }
            else {
                countWords[word]++;
            }

        }
        $.each(
            countWords, function(intIndex, objValue) {
                if (characterCount == 0) {
                    return;
                } else {
                    wordList.append(
                        $("<li>" + intIndex + " > " + objValue + "</li>"));
                }

            });

    });

    $(textAreaName).keyup();

    $('.sample-text').on('click', function() {
        $(textAreaName).val(sampleText);
    });
    $('.clear-text').on('click', function() {
        $(textAreaName).val('');
        $('.text-statistics').trigger('mouseenter').trigger('mouseleave');
    });

   // toggleClass with both mouseenter and mouseleave events simultaneously
   $(".text-statistics").on({
       mouseenter: function(){
           $(".stats, .word-list").toggleClass("fade-in");
       },
       mouseleave: function(){
           $(".stats, .word-list").toggleClass("fade-in");
       }
   });

    // toggleClass with both mouseenter and mouseleave events simultaneously
    $(".counts").on({
        mouseenter: function(){
            $(".averages, .readability").toggleClass("dim");
        },
        mouseleave: function(){
            $(".averages, .readability").toggleClass("dim");
        }
    });

    // toggleClass with both mouseenter and mouseleave events simultaneously
    $(".averages").on({
        mouseenter: function(){
            $(".counts, .readability").toggleClass("dim");
        },
        mouseleave: function(){
            $(".counts, .readability").toggleClass("dim");
        }
    })

    // toggleClass with both mouseenter and mouseleave events simultaneously
    $(".readability").on({
        mouseenter: function(){
            $(".counts, .averages").toggleClass("dim");
        },
        mouseleave: function(){
            $(".counts, .averages").toggleClass("dim");
        }
    });

});

// Load the
$(document).foundation('joyride', 'start');
