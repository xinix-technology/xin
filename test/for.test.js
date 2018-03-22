// import xin from '../../';
// import { Fixture } from '../../components/fixture';
// import '../../components/for';

// <template id="tpl">
//   <xin-xhr url="../mock/people.json"></xin-xhr>
// </template>

// describe('For', () => {
//   it('defined', () => {
//     expect(xin.get('xin-for')).toBeTruthy();
//   });

//   it('render to parent', async done => {
//     try {
//       let template = `
//         <xin-for items="[[items]]">
//           <template>
//             <span>[[item]]</span>
//           </template>
//         </xin-for>
//       `;
//       let fixture = Fixture.create(template, { items: [ 'foo', 'bar', 'baz' ] });

//       await fixture.waitConnected();

//       expect(fixture.querySelectorAll('span').length).toEqual(3);

//       fixture.dispose();

//       done();
//     } catch (err) {
//       done.fail(err);
//     }
//   });

//   it('render to other dom', async done => {
//     try {
//       let fixture = Fixture.create(
//         `
//           <div id="here"></div>
//           <xin-for items="[[items]]" to="#here">
//             <template>
//               <span>[[item]]</span>
//             </template>
//           </xin-for>
//         `,
//         {
//           items: ['foo', 'bar', 'baz'],
//         }
//       );

//       await fixture.waitConnected(100);

//       expect(fixture.$.here.querySelectorAll('span').length).toEqual(3);

//       fixture.dispose();

//       done();
//     } catch (err) {
//       done.fail(err);
//     }
//   });
// });
