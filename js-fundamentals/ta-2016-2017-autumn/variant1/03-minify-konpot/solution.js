function solve(args) {
    'use strict';

    const lowercase = 'abcdefghijklmnopqrstuvwxyz',
        uppercase = lowercase.toUpperCase(),
        underscore = '_',
        digits = '0123456789',
        charCount = lowercase.length + uppercase.length + digits.length + underscore.length;

    const singleChar = 1, doubleChar = 2;


    let konpot = args.join(''),
        minifiedKompotLength = 0,
        partlyMinified;

    // Remove white spaces
    partlyMinified = konpot.replace(/\s/g, '');

    // Get identifiers
    let identifiers = {};
    partlyMinified
        .match(/\w+/g)
        .forEach(function (ident) {
            if (identifiers[ident]) {
                identifiers[ident]++;
            } else {
                identifiers[ident] = 1;
            }
        });

    let countsList = [];
    for (var ident in identifiers) {
        if (identifiers.hasOwnProperty(ident)) {
            countsList.push(identifiers[ident]);
        }
    }

    countsList
        .sort(function (a, b) { return b - a }) // descending sort
        .forEach(function (count, index) {
            minifiedKompotLength += count * (index < charCount ? singleChar : doubleChar);
        });


    let oldLength;
    do {
        oldLength = partlyMinified.length
        partlyMinified = partlyMinified.replace(/{;*}/g, ';'); // => a{}b -> a;b
    } while (partlyMinified.length !== oldLength);

    partlyMinified = partlyMinified
        .replace(/;+/g, ';')
        .replace(/;{/g, '{')
        .replace(/{;/g, '{')
        .replace(/;}/g, '}')
        .replace(/};/g, '}')
        .replace(/^;/, '')
        .replace(/;$/, '');

    // Get symbols
    var symbols = partlyMinified.replace(/\w+/g, '');

    minifiedKompotLength += symbols.length;
    console.log(minifiedKompotLength);
}

let input = [
    'hello;',
    '{this; is',
    ' ; an;;;example;',
    '}',
    'of;',
    '{',
    'KONPOT;',
    '{',
    'Some_numbers;',
    '42;5;3}',
    '_}'
];

solve(input);


let input2 = [
    '; ;;;jGefn4E5Pvq    ;;  ;  ; ;',
    'tQRZ5MMj26Ov { {    {;    ;;    5OVyKBFu7o1T2 ;szDVN2dWhex1V;1gDdNdANG2',
    ';    ;    ;  ;; jGefn4E5Pvq   ;;    ;p0OWoVFZ8c;;}    ;  ; ;',
    '5OVyKBFu7o1T2   ;  szDVN2dWhex1V ;    ;tQRZ5MMj26Ov    ;  ;   };',
    '1gDdNdANG2    ;   p0OWoVFZ8c ;  jGefn4E5Pvq ;; {;Z9n;;',
    ';1gDdNdANG2;   ;;    ;   ;jGefn4E5Pvq    ;; ;;p0OWoVFZ8c;;    ;;',
    ';',
    'tQRZ5MMj26Ov  ;',
    '{    ;szDVN2dWhex1V;   ;',
    ';   jGefn4E5Pvq   ;  ;  } }}'
];

solve(input2);

let input3 = [
    '1; 2; 3; 4; 5; 6; 7; 8; 9; 10; 11; 12; 13; 14;',
    '15; 16; 17; 18; 19; 20; 21; 22; 23; 24; 25; 26; 27; 28;',
    '29; 30; 31; 32; 33; 34; 35; 36; 37; 38; 39; 40; 41; 42;',
    '43; 44; 45; 46; 47; 48; 49; 50; 51; 52; 53; 54; 55; 56;',
    '57; 58; 59; 60; 61; 62; 63; 64; 65; 66; 67; 68; 69; 70;'
]
solve(input3);

let input4 = [
    ';w8lkcbReex3aK ; ldwZhw9KDoQb5VU',
    ';    3AtVPL8IYW;;   Rj7WxIHCZtn8P  ;y4xOCUfWUSQq;;  ;    kjz;',
    ';;    QyPt_m83ZId',
    ';',
    ';; {    ; fFPTVxJ5F;;XtBbhJpNUu9  ; iTyyn9XLpU1iav;WXOduheV56LTKz   {  ;;  ;;;Mx7_XXL}; ;j3n;  ;;srTekxWpGNwI{  ;}   ;;_a ;E1; ;;wTN6MShUS8Gu;   _j6hWRv4GA9G5;;; ; ;DG1NrgrhaA6M1Rn   ;',
    ';',
    ';w1wZ    ;; ; W4;;DG1NrgrhaA6M1Rn  ;t',
    ';  ;LpjFSq5    ;M9376uGSnX;; ;;',
    'aZ;plQAzdUn;    ; ;nU36bptp8W8dwRS',
    ';Z; ;   ;;;  U;;    ;;;;    3UUVhrcg;MogaN9ts};40S;',
    ';',
    '{;;; Jbmj3;;    w8lkcbReex3aK  ; ;  {;  ;    ;}',
    'y4xOCUfWUSQq ;',
    ';jWGkAbfW8fe;   ;;',
    'ldwZhw9KDoQb5VU;   Rj7WxIHCZtn8P    ; ;  ;; iTyyn9XLpU1iav;  ;',
    ';    ;   ;; uFKuLRD7frg1_2n',
    ';',
    ';;',
    'sWGs7y09gOl;Qu5G6c0aoUiz8tJ;;    ;;Te47tf8tvjVUFo8 ;',
    ';;kgZAHONNo;;;3  ;    ;;;j3n   ;   ;;   ;   ;B',
    ';   ;};;',
    'G9In9VIKr4e;rOARB7g',
    '{ ;M9376uGSnX;;',
    '93I0PLWQ_F;   ;    ;;',
    ';',
    ';pajbAfBoU4w4;;    ;o29emIj;Rj7WxIHCZtn8P',
    ';;   ;}',
    ';',
    ';;   {};  ;Y;_ ;ldwZhw9KDoQb5VU   ;vDy8OCVt4cCRzni; 3',
    ';    FvhW2;;;plQAzdUn ;w1wZ;   ;    pajbAfBoU4w4 ;;',
    'Jbmj3;FvhW2 ;',
    ';{',
    ';;    aZvf0rWzq    {;;Rj7WxIHCZtn8P;  ;;W4',
    '};    ;{  ;   ;    ;    {    ; qz_',
    ';wTN6MShUS8Gu; ;    ;;',
    'kzwHBr2MbqUj',
    ';   ;',
    '_  ;;    Y   ;  ;}};;Lht1Y',
    ';   ;  ;40S;M8ypA  {',
    ';',
    ';;',
    '}{    ;    ;}   ; ;;    ;;G9In9VIKr4e;',
    'FvhW2  ;   ;KWsad4  ;NE}',
    'w  ;FvhW2    ;DG1NrgrhaA6M1Rn;;  ;   y4xOCUfWUSQq;;   ;NE;9fY7rV1Q    ;;;',
    ';qz_   ;   ;;5zAcRJ    ;srTekxWpGNwI;    ;  klnCn_tJ;  j3n; ;  ;  ; nU36bptp8W8dwRS;;;aZ    ;  Qu5G6c0aoUiz8tJ;   nWIgxFjm;U;giQD; LA91rVcWv;  ;;; kjz;gFJillfL9MDeliO;   w1wZ;;FvhW2  ; ;;85;Z',
    '{    ;;  ;',
    ';   E1  }vDy8OCVt4cCRzni',
    '{  };  ;',
    '3AtVPL8IYW    ;  Z    ;   ;    ;  ;',
    '; ;W4;    ;  WqZoORpjg  ;    ;',
    'kzwHBr2MbqUj   ;  FLlnvd0RQ1M; pajbAfBoU4w4  ;    ;; w8lkcbReex3aK  ;   ;;;;;',
    'U;; ;WXOduheV56LTKz  ;   aZvf0rWzq;;;M9376uGSnX ;;   ;Te47tf8tvjVUFo8;;;',
    'aZ    ; ;;   ;   SbpipRAuvZbX;   ;;;   pajbAfBoU4w4;  ;;  7dDk69hD8b6 ; 5zAcRJ   ;  ;  ;kgZAHONNo    ; y4xOCUfWUSQq;Mx7_XXL;3AtVPL8IYW;    ;;  ;    ; lyR_p  ;;W4    ;;;  vDy8OCVt4cCRzni;',
    ';    M9376uGSnX;   ;;FF {;   40S;;    } ;  B  ;;   ;Lht1Y;;    ;E1',
    ';  uFKuLRD7frg1_2n;Mx7_XXL  ;;;  XtBbhJpNUu9    ;',
    ';;MogaN9ts;;;FLlnvd0RQ1M; ; Ph09oQgeuICUryn;;'
];

solve(input4); //300
