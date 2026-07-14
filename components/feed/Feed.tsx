export default function Feed(){
  const items=["ข่าวสำคัญ","ร้านแนะนำ","โปรโมชั่น"];
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-bold">🔥 Smart Feed</h2>
      {items.map(i=>(
        <div key={i} className="glass rounded-2xl p-4">{i}</div>
      ))}
    </div>
  );
}
