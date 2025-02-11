export type RoomsType = {[key: string]: Room}

export interface Room {
	actions?: { [key: string]: string }
  description: string;
  steps: { [key: string]: string }; 
}

export const rooms: RoomsType = {
  start: {
    description:
      "Ты находишься в пустом пространстве. Ты можешь идти прямо, налево или направо.",
    steps: {
      прямо: "room_center",
      налево: "bathroom",
      направо: "exit_outside",
    },
  },
  room_center: {
    description:
      "Ты стоишь посреди комнаты. Напротив тебя находится шкаф и часы. Ты можешь идти назад или направо.",
    steps: {
      назад: "start",
      направо: "junk_room",
    },
    actions: {
      "посмотреть на часы": "clock_time"
    }
  },
	junk_room: {
		description: "Заваленное до верха хламом помещение. Чего здесь только нет.",
		steps: {
			назад: "room_center"			
		},
    actions: {
      "осмотреть хлам": "inspect_junk_room"
    }
	},

	
  bathroom: {
    description:
      "Это помещение напоминает уборную. Ты видишь умывальник, таз для воды и зеркало. Ты можешь идти назад.",
    steps: {
      назад: "start",
    },
  },
  exit_outside: {
    description: "Ты вышел из дома. Что дальше? Ты можешь идти назад.",
    steps: {
      назад: "start",
    },
  },
};

export interface Action {
	// actions?: { [key: string]: string }
  description: string;
  // steps: { [key: string]: string }; // Направление: Следующее состояние
}

export const actions: { [key: string]: Action } = {
  clock_time: {
    description:"Часы показывают настоящее время"
  },

  inspect_junk_room: {
		description:"Ты нашел полезный предмет",
	},
} 