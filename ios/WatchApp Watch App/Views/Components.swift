import SwiftUI


struct EdgeBorder: Shape {
    var width: CGFloat
    var edges: [Edge]

    func path(in rect: CGRect) -> Path {
        edges.map { edge -> Path in
            switch edge {
            case .top: return Path(.init(x: rect.minX, y: rect.minY, width: rect.width, height: width))
            case .bottom: return Path(.init(x: rect.minX, y: rect.maxY - width, width: rect.width, height: width))
            case .leading: return Path(.init(x: rect.minX, y: rect.minY, width: width, height: rect.height))
            case .trailing: return Path(.init(x: rect.maxX - width, y: rect.minY, width: width, height: rect.height))
            }
        }.reduce(into: Path()) { $0.addPath($1) }
    }
}

extension View {
    func border(width: CGFloat, edges: [Edge], color: Color) -> some View {
        overlay(EdgeBorder(width: width, edges: edges).foregroundColor(color))
    }
}


struct Cell: View {
    var didTop: Bool
    var gameMod: Int = 1
    @Binding var currentServer: Player
  @Binding var myScores: [Int]
  @Binding var opponentScores: [Int]
  @Binding var currentSet: Int
    
    var body: some View {
        HStack() {
            Rectangle()
              .foregroundColor(.clear)
              .frame(width: 19, height: 19)
              .background(didTop ? AppColors.Primary : AppColors.Red)
              .cornerRadius(5)
              .padding(8)
            if (currentServer == Player.Me && didTop) || (currentServer == Player.Opponent && !didTop) {
                Image("LogoIcon")
                    .resizable()
                    .frame(width: 13, height: 13)
            }
            Spacer()
            ForEach(0 ..< gameMod, id: \.self) { i in
              Text(String(didTop ? myScores[i] : opponentScores[i]))
                    .foregroundColor(currentSet == i ? Color.white : AppColors.DarkGrey)
                    .padding()
                    .frame(width: 26, alignment: .center)
                    .border(width: 1, edges: [.leading], color: Color(red: 0.19, green: 0.19, blue: 0.19))
                    .padding(.trailing, (gameMod == 3 && i == 0) ? -5 : 0)
            }
        }
          .foregroundColor(.clear)
          .frame(height: 35, alignment: .trailing)
          .border(width: 1, edges: didTop ? [] : [.top], color: Color(red: 0.19, green: 0.19, blue: 0.19))
          .offset(y: didTop ? 2.5 : -2.5)
    }
}
