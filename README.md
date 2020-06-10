/_ newOrders _/ orders.map((item, index) => {
/_ let hour = newOrders[index].horaestimada.split(':');
let hour2 = newOrders[index].horadestino.split(':'); _/

{/_ <ShippingCard
key={index}
date={
item.esprogramado
? format(
new Date(
item.fechaprogramada
),
'dd-MM-yyyy'
)
: format(
new Date(item.fechadestino),
'dd-MM-yyyy'
)
}
hour={
item.esprogramado
? `${hour[0]}:${hour[1]}`
: `${hour2[0]}:${hour2[1]}`
}
distance={item.distancia }
from={item.direccionorg}
to={ item.direcciondes }
/>
); _/}
