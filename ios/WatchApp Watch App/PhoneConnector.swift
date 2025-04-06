import WatchConnectivity
import UIKit
import WatchKit


final class PhoneConnector: NSObject, WCSessionDelegate, ObservableObject {
  var session: WCSession
  
  init(session: WCSession  = .default) {
    self.session = session
    super.init()
    if WCSession.isSupported() {
      session.delegate = self
      session.activate()
    }
  }
  
  func session(_ session: WCSession, activationDidCompleteWith activationState: WCSessionActivationState, error: Error?) {
    switch activationState {
      case .activated:
        print("WCSession activated successfully")
      case .inactive:
        print("Unable to activate the WCSession. Error: \(error?.localizedDescription ?? "--")")
      case .notActivated:
        print("Unexpected .notActivated state received after trying to activate the WCSession")
      @unknown default:
        print("Unexpected state received after trying to activate the WCSession")
      }
  }

  func session(_ session: WCSession, didReceiveMessage message: [String : Any], replyHandler:
               @escaping ([String : Any]) -> Void) {
    guard let messageType = message["type"] as? String else {
      replyHandler(["error": "Invalid message"])
      return
    }
    switch messageType {
    case "trigger":
      if let ids = UserDefaults.standard.array(forKey: "matches-ids") {
        for matchId in ids {
          if let data = UserDefaults.standard.string(forKey: matchId as! String) {
            self.session.transferUserInfo(["watchMessage": data])
          }
        }
      }
      return replyHandler(["message": "Received message"])
    case "removeMatchId":
      if let matchId = message["matchId"] as? String {
        if let ids = UserDefaults.standard.array(forKey: "matches-ids") {
          let newIds = ids.filter { $0 as! String != matchId }
          UserDefaults.standard.set(newIds, forKey: "matches-ids")
        }
      }
      return replyHandler(["message": "Received message"])
    default:
      replyHandler(["error": "Invalid message"])
      return
    }
  }
  
  func sendUserInfo(data: String, id: String) {
    let msg = ["watchMessage": data]
    self.session.sendMessage(["watchMessage": id], replyHandler: nil)
    if self.session.activationState.rawValue == 2 {
      self.session.transferUserInfo(msg)
    } else {
      var ids = UserDefaults.standard.array(forKey: "matches-ids") ?? []
      ids.append(id)
      UserDefaults.standard.set(ids, forKey: "matches-ids")
      UserDefaults.standard.set(data, forKey: id)
      print("session inactive")
    }
  }
}
