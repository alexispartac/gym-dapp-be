

const allExercises = [
    { 
        name: "Squat", 
        muscleGroup: "Legs", 
        id: "1",
        description: "Squatul este unul dintre cele mai eficiente exerciții pentru întărirea și dezvoltarea mușchilor picioarelor, implicând în principal cvadricepșii, fesierii și mușchii posteriori ai coapsei. Este considerat un exercițiu de bază în multe programe de antrenament, datorită numeroaselor sale beneficii.",
        execution: [
            "Poziționează-te cu picioarele la lățimea umerilor, tălpile bine fixate pe podea.",
            "Ține spatele drept și privirea înainte. Poți să ții brațele întinse înainte pentru echilibru sau să le așezi pe șolduri.",
            "Îndoaie genunchii și coboară șoldurile, ca și cum te-ai așeza pe un scaun imaginar. Genunchii trebuie să rămână în linie cu vârfurile picioarelor.",
            "Coboară până când coapsele sunt paralele cu solul (sau cât îți permite flexibilitatea și forma corectă).",
            "Revino la poziția inițială, împingând prin călcâie și activând fesierii."
        ],
        advice: "Menține spatele drept pe tot parcursul mișcării pentru a evita presiunea asupra coloanei vertebrale. Evită să lași genunchii să treacă mult peste vârfurile degetelor picioarelor. Respiră: inspiră când cobori și expiră în timp ce te ridici."
    },
    { 
        name: "Deadlift", 
        muscleGroup: "Back", 
        id: "2",
        description: "Deadlift-ul este unul dintre cele mai eficiente exerciții pentru întărirea musculaturii spatelui, dar implică și mușchii fesieri, hamstring-uri, coapse și chiar antebrațele. Este un exercițiu fundamental pentru forță și coordonare.",
        execution: [
            "Poziționează-te în fața unei haltere, cu picioarele la lățimea umerilor și tălpile sub bară.",
            "Prinde bara cu ambele mâini folosind o priză overhand (sau una mixtă, dacă preferi).",
            "Îndoaie genunchii și coboară șoldurile până ajungi într-o poziție în care spatele rămâne drept, iar pieptul este ridicat.",
            "Inspiră adânc și, în timp ce expiri, împinge prin călcâie și îndreaptă șoldurile, ridicând haltera până când stai drept, cu spatele în extensie.",
            "Coboară controlat haltera înapoi la sol, păstrând forma corectă."
        ],
        advice: "Menține spatele drept pe tot parcursul mișcării pentru a preveni accidentările.Asigură-te că bara rămâne aproape de corp, trecând peste tibii și coapse. Evită să arcuiești spatele sau să ridici haltera cu brațele—mișcarea principală trebuie să vină din picioare și șolduri."

    
    },
    { name: "Plank", muscleGroup: "Abdominals", id: "3" },
    { name: "Side-Lying Leg Raise", muscleGroup: "Abductors", id: "4" },
    { name: "Barbell Curl", muscleGroup: "Biceps", id: "5" },
    { name: "Seated Calf Raise", muscleGroup: "Calves", id: "6" },
    { name: "High-Intensity Interval Training (HIIT)", muscleGroup: "Cardio", id: "7" },
    { name: "Push-Up", muscleGroup: "Chest", id: "8" },
    { name: "Burpee", muscleGroup: "Full Body", id: "9" },
    { name: "Hip Thrust", muscleGroup: "Glutes", id: "10" },
    { name: "Lat Pulldown", muscleGroup: "Lats", id: "11" },
    { name: "Neck Curl", muscleGroup: "Neck", id: "12" },
    { name: "Overhead Press", muscleGroup: "Shoulders", id: "13" },
    { name: "Barbell Shrug", muscleGroup: "Traps", id: "14" },
    { name: "Triceps Pushdown", muscleGroup: "Triceps", id: "15" },
    { name: "Face Pull", muscleGroup: "Upper Back", id: "16" },
    { name: "Bulgarian Split Squat", muscleGroup: "Legs", id: "17" },
    { name: "Chin-Up", muscleGroup: "Back", id: "18" },
    { name: "Hanging Leg Raise", muscleGroup: "Abdominals", id: "19" },
    { name: "Cable Abduction", muscleGroup: "Abductors", id: "20" },
    { name: "Hammer Curl", muscleGroup: "Biceps", id: "21" },
    { name: "Standing Calf Raise", muscleGroup: "Calves", id: "22" },
    { name: "Jump Rope", muscleGroup: "Cardio", id: "23" },
    { name: "Incline Bench Press", muscleGroup: "Chest", id: "24" },
    { name: "Mountain Climbers", muscleGroup: "Full Body", id: "25" },
    { name: "Cable Glute Kickback", muscleGroup: "Glutes", id: "26" },
    { name: "Pull-Up", muscleGroup: "Lats", id: "27" },
    { name: "Neck Extension", muscleGroup: "Neck", id: "28" },
    { name: "Lateral Raise", muscleGroup: "Shoulders", id: "29" },
    { name: "Dumbbell Shrug", muscleGroup: "Traps", id: "30" },
    { name: "Skull Crushers", muscleGroup: "Triceps", id: "31" },
    { name: "Bent-Over Row", muscleGroup: "Upper Back", id: "32" },
    { name: "Hack Squat", muscleGroup: "Legs", id: "33" },
    { name: "Lat Pullover", muscleGroup: "Back", id: "34" },
    { name: "Russian Twist", muscleGroup: "Abdominals", id: "35" },
    { name: "Fire Hydrant", muscleGroup: "Abductors", id: "36" },
    { name: "Concentration Curl", muscleGroup: "Biceps", id: "37" },
    { name: "Donkey Calf Raise", muscleGroup: "Calves", id: "38" },
    { name: "Sled Push", muscleGroup: "Cardio", id: "39" },
    { name: "Cable Crossover", muscleGroup: "Chest", id: "40" },
    { name: "Bear Crawl", muscleGroup: "Full Body", id: "41" },
    { name: "Step-Up", muscleGroup: "Glutes", id: "42" },
    { name: "One-Arm Dumbbell Row", muscleGroup: "Lats", id: "43" },
    { name: "Neck Rotation", muscleGroup: "Neck", id: "44" },
    { name: "Front Raise", muscleGroup: "Shoulders", id: "45" },
    { name: "Cable Shrug", muscleGroup: "Traps", id: "46" },
    { name: "Overhead Triceps Extension", muscleGroup: "Triceps", id: "47" },
    { name: "T-Bar Row", muscleGroup: "Upper Back", id: "48" },
    { name: "Leg Press", muscleGroup: "Legs", id: "49" },
    { name: "Barbell Row", muscleGroup: "Back", id: "50" },
    { name: "Sit-Up", muscleGroup: "Abdominals", id: "51" },
    { name: "Hip Abduction Machine", muscleGroup: "Abductors", id: "52" },
    { name: "Cable Biceps Curl", muscleGroup: "Biceps", id: "53" },
    { name: "Box Jump", muscleGroup: "Calves", id: "54" },
    { name: "Rowing Machine", muscleGroup: "Cardio", id: "55" },
    { name: "Decline Bench Press", muscleGroup: "Chest", id: "56" },
    { name: "Burpee Pull-Up", muscleGroup: "Full Body", id: "57" },
    { name: "Glute Bridge", muscleGroup: "Glutes", id: "58" },
    { name: "Wide-Grip Pull-Up", muscleGroup: "Lats", id: "59" },
    { name: "Neck Flexion", muscleGroup: "Neck", id: "60" },
    { name: "Dumbbell Press", muscleGroup: "Shoulders", id: "61" },
    { name: "Farmer's Walk", muscleGroup: "Traps", id: "62" },
    { name: "Cable Triceps Pushdown", muscleGroup: "Triceps", id: "63" },
    { name: "Reverse Fly", muscleGroup: "Upper Back", id: "64" },
    { name: "Goblet Squat", muscleGroup: "Legs", id: "65" },
    { name: "Single-Arm Row", muscleGroup: "Back", id: "66" },
    { name: "Hanging Knee Raise", muscleGroup: "Abdominals", id: "67" },
    { name: "Clamshell", muscleGroup: "Abductors", id: "68" },
    { name: "Preacher Curl", muscleGroup: "Biceps", id: "69" },
    { name: "Pistol Squat", muscleGroup: "Legs", id: "70" },
    { name: "Battle Ropes", muscleGroup: "Cardio", id: "71" },
    { name: "Incline Push-Up", muscleGroup: "Chest", id: "72" },
    { name: "Turkish Get-Up", muscleGroup: "Full Body", id: "73" },
    { name: "Good Morning", muscleGroup: "Glutes", id: "74" },
    { name: "Cable Pull-Through", muscleGroup: "Glutes", id: "75" },
    { name: "Cable Upright Row", muscleGroup: "Shoulders", id: "76" },
    { name: "Zercher Squat", muscleGroup: "Legs", id: "77" },
    { name: "Superman", muscleGroup: "Lower Back", id: "78" },
    { name: "Incline Dumbbell Fly", muscleGroup: "Chest", id: "79" },
    { name: "Arnold Curl", muscleGroup: "Biceps", id: "80" },
    { name: "Weighted Russian Twist", muscleGroup: "Abdominals", id: "81" },
    { name: "Reverse Lunge", muscleGroup: "Legs", id: "82" },
    { name: "Landmine Press", muscleGroup: "Shoulders", id: "83" },
    { name: "Rope Climb", muscleGroup: "Full Body", id: "84" },
    { name: "Tire Flip", muscleGroup: "Full Body", id: "85" },
    { name: "Barbell Hip Thrust", muscleGroup: "Glutes", id: "86" },
    { name: "Romanian Deadlift", muscleGroup: "Hamstrings", id: "87" },
    { name: "Weighted Pull-Up", muscleGroup: "Back", id: "88" },
    { name: "Dumbbell Front Squat", muscleGroup: "Legs", id: "89" },
    { name: "Dumbbell Fly", muscleGroup: "Chest", id: "90" },
    { name: "Kettlebell Swing", muscleGroup: "Full Body", id: "91" },
    { name: "Rope Face Pull", muscleGroup: "Shoulders", id: "92" },
    { name: "Dragon Flag", muscleGroup: "Abdominals", id: "93" },
    { name: "Incline Dumbbell Press", muscleGroup: "Chest", id: "94" },
    { name: "Overhead Squat", muscleGroup: "Legs", id: "95" },
    { name: "Dumbbell Step-Up", muscleGroup: "Legs", id: "96" },
    { name: "Wide-Grip Lat Pulldown", muscleGroup: "Back", id: "97" },
    { name: "Cable Lateral Raise", muscleGroup: "Shoulders", id: "98" },
    { name: "Reverse Crunch", muscleGroup: "Abdominals", id: "99" },
    { name: "Pec Deck Fly", muscleGroup: "Chest", id: "100" }
];

export default allExercises;