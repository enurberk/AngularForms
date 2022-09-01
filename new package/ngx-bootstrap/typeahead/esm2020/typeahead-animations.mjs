import { animate, style, state, transition, trigger } from '@angular/animations';
export const TYPEAHEAD_ANIMATION_TIMING = '220ms cubic-bezier(0, 0, 0.2, 1)';
export const typeaheadAnimation = trigger('typeaheadAnimation', [
    state('animated-down', style({ height: '*', overflow: 'hidden' })),
    transition('* => animated-down', [
        style({ height: 0, overflow: 'hidden' }),
        animate(TYPEAHEAD_ANIMATION_TIMING)
    ]),
    state('animated-up', style({ height: '*', overflow: 'hidden' })),
    transition('* => animated-up', [
        style({ height: '*', overflow: 'hidden' }),
        animate(TYPEAHEAD_ANIMATION_TIMING)
    ]),
    transition('* => unanimated', animate('0s'))
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZWFoZWFkLWFuaW1hdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvdHlwZWFoZWFkL3R5cGVhaGVhZC1hbmltYXRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxPQUFPLEVBQ1AsS0FBSyxFQUVMLEtBQUssRUFDTCxVQUFVLEVBQ1YsT0FBTyxFQUNSLE1BQU0scUJBQXFCLENBQUM7QUFFN0IsTUFBTSxDQUFDLE1BQU0sMEJBQTBCLEdBQUcsa0NBQWtDLENBQUM7QUFFN0UsTUFBTSxDQUFDLE1BQU0sa0JBQWtCLEdBQzdCLE9BQU8sQ0FBQyxvQkFBb0IsRUFBRTtJQUM1QixLQUFLLENBQUMsZUFBZSxFQUFFLEtBQUssQ0FBQyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBQyxDQUFDLENBQUM7SUFDakUsVUFBVSxDQUFDLG9CQUFvQixFQUFFO1FBQy9CLEtBQUssQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxDQUFDO1FBQ3hDLE9BQU8sQ0FBQywwQkFBMEIsQ0FBQztLQUNwQyxDQUFDO0lBQ0YsS0FBSyxDQUFDLGFBQWEsRUFBRSxLQUFLLENBQUMsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUMsQ0FBQyxDQUFDO0lBQy9ELFVBQVUsQ0FBQyxrQkFBa0IsRUFBRTtRQUM3QixLQUFLLENBQUMsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsQ0FBQztRQUMxQyxPQUFPLENBQUMsMEJBQTBCLENBQUM7S0FDcEMsQ0FBQztJQUNGLFVBQVUsQ0FBQyxpQkFBaUIsRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7Q0FDN0MsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgYW5pbWF0ZSxcbiAgc3R5bGUsXG4gIEFuaW1hdGlvblRyaWdnZXJNZXRhZGF0YSxcbiAgc3RhdGUsXG4gIHRyYW5zaXRpb24sXG4gIHRyaWdnZXJcbn0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5cbmV4cG9ydCBjb25zdCBUWVBFQUhFQURfQU5JTUFUSU9OX1RJTUlORyA9ICcyMjBtcyBjdWJpYy1iZXppZXIoMCwgMCwgMC4yLCAxKSc7XG5cbmV4cG9ydCBjb25zdCB0eXBlYWhlYWRBbmltYXRpb246IEFuaW1hdGlvblRyaWdnZXJNZXRhZGF0YSA9XG4gIHRyaWdnZXIoJ3R5cGVhaGVhZEFuaW1hdGlvbicsIFtcbiAgICBzdGF0ZSgnYW5pbWF0ZWQtZG93bicsIHN0eWxlKHsgaGVpZ2h0OiAnKicsIG92ZXJmbG93OiAnaGlkZGVuJ30pKSxcbiAgICB0cmFuc2l0aW9uKCcqID0+IGFuaW1hdGVkLWRvd24nLCBbXG4gICAgICBzdHlsZSh7IGhlaWdodDogMCwgb3ZlcmZsb3c6ICdoaWRkZW4nIH0pLFxuICAgICAgYW5pbWF0ZShUWVBFQUhFQURfQU5JTUFUSU9OX1RJTUlORylcbiAgICBdKSxcbiAgICBzdGF0ZSgnYW5pbWF0ZWQtdXAnLCBzdHlsZSh7IGhlaWdodDogJyonLCBvdmVyZmxvdzogJ2hpZGRlbid9KSksXG4gICAgdHJhbnNpdGlvbignKiA9PiBhbmltYXRlZC11cCcsIFtcbiAgICAgIHN0eWxlKHsgaGVpZ2h0OiAnKicsIG92ZXJmbG93OiAnaGlkZGVuJyB9KSxcbiAgICAgIGFuaW1hdGUoVFlQRUFIRUFEX0FOSU1BVElPTl9USU1JTkcpXG4gICAgXSksXG4gICAgdHJhbnNpdGlvbignKiA9PiB1bmFuaW1hdGVkJywgYW5pbWF0ZSgnMHMnKSlcbiAgXSk7XG4iXX0=