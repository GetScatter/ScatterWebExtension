const possibleSuffixes = [
    'Rabbit',
    'Rhino',
    'Raccoon',
    'Ragdoll',
    'Rat',
    'RattleSnake',
    'Reindeer',
    'Robin',
    'Royalty'
];

const randomSuffix = () => {
    const suffix = possibleSuffixes[Math.floor(Math.random() * possibleSuffixes.length)];
    const randomNumber = Math.floor(Math.random() * 1000 + 1);
    return `${suffix}${randomNumber}`;
};

export default class RIDLService {

    static randomName(){
        return new Promise((resolve, reject) => {
            const name = `Random${randomSuffix()}`;
            if(name.length > 20) return this.randomName();
            resolve(name);
        });
    }

}