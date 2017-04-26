function solve(text) {
    'use strict';

    let enumerations = [],
        current = 0,
        setOfValues = [],
        sharedSetOfValues = [],
        isSharedEnum;

    for (let i = 0; i < text.length; i += 1) {
        let line = text[i];

        if (isEnumeration(line)) {
            line = line.trim();

            if (line.indexOf('@') >= 0) {
                isSharedEnum = true;
                line = line.substr(2, line.length - 3).trim();
            }
            else {
                isSharedEnum = false;
                line = line.substr(1, line.length - 2).trim();
            }

            enumerations.push(
                {
                    'enum': line,
                    'shared': isSharedEnum,
                    'props': [],
                }
            );
        } else if (isProperty(line)) {
            let propAndValueArr = line.replace(';', '').trim().split('=');

            if (propAndValueArr[1] !== undefined) {
                if (enumerations[current].shared) {
                    sharedSetOfValues[+propAndValueArr[1].trim()] = true;
                }
                else {
                    setOfValues[+propAndValueArr[1].trim()] = true;
                }
            }

            if (enumerations[current].shared) {
                sharedSetOfValues.push(undefined);
            }
            else {
                setOfValues.push(undefined);
            }
            //console.log(setOfValues);

            enumerations[current].props.push(
                {
                    'propName': propAndValueArr[0].trim(),
                    'propValue': propAndValueArr[1] !== undefined ? (+propAndValueArr[1].trim()) : undefined,
                }
            );
        } else { //end of enum </>
            if (!enumerations[current].shared) {
                setValues(enumerations[current].props, setOfValues);
                setOfValues = [];
            }
            current += 1;
        }
    }

    //SetValues For the shared
    enumerations.forEach(x => {
        if (x.shared) {
            setValues(x.props, sharedSetOfValues);
        }
    });

    //Print the result
    printResult(enumerations);


    function isEnumeration(line) {
        return line.indexOf('<') >= 0 && line.indexOf('/') < 0;
    }

    function isProperty(line) {
        return line.indexOf('<') < 0;
    }

    function setValues(propArr, set) {
        propArr.map(propObj => {
            if (propObj.propValue === undefined) {
                propObj.propValue = set.findIndex(x => x === undefined);
                set[propObj.propValue] = true;
            }
        });
    }

    function printResult(enumList) {
        let result = [];
        
        for (let en of enumList) {

            for (let pr of en.props) {
                result.push(`${pr.propName} = ${pr.propValue} :: ${en.enum}`);
            }
        }
        console.log(result.sort());
    }

}
solve([
    '<@Languages>',
    '   CSharp;',
    '   JavaScript;',
    '   Haskell = 42;',
    '   Rust = 4;',
    '   CPP;',
    '</>',
    '<Result>',
    '   Failed;',
    '   Passed;',
    '   Excellence;',
    '</>',
    '<@Insects>',
    '   Ant;',
    '   Mosquito = 2;',
    '</>'
]);