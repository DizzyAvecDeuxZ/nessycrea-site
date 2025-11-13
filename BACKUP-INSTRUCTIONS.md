# 🔒 SYSTÈME DE SAUVEGARDE NESSYCREA

## ⚠️ IMPORTANT : CLAUDE NE SE SOUVIENT PAS

**Claude Code n'a AUCUNE mémoire entre les sessions.** Chaque conversation est indépendante.

## 🛡️ Protection mise en place

### 1. Git (Historique local)
```bash
cd Desktop/nessycrea-site-vanilla
git log                    # Voir l'historique
git diff                   # Voir les changements
git checkout <commit>      # Revenir à une version
```

### 2. Backups automatiques dans Documents
Emplacement : `C:\Users\Spare\Documents\nessycrea-backups\`

### 3. Sauvegardes dans Downloads
Les versions exportées sont dans `Downloads/`

## 📋 PROCÉDURE À SUIVRE

### Avant de commencer une session avec Claude
1. Ouvrez un terminal
2. Créez un backup :
```bash
cd Desktop/nessycrea-site-vanilla
git add -A
git commit -m "Avant session Claude - $(date)"
```

### Pendant la session
Claude doit faire un commit après chaque modification importante :
```bash
git add -A
git commit -m "Description de la modification"
```

### Après la session
1. Créez un backup final :
```bash
cd Desktop/nessycrea-site-vanilla
git add -A
git commit -m "Fin session Claude - $(date)"
```

2. Copiez dans Documents (backup externe) :
```bash
cp -r Desktop/nessycrea-site-vanilla Documents/nessycrea-backups/nessycrea-$(date +%Y-%m-%d-%H%M)
```

## 🚨 EN CAS DE PERTE

### Méthode 1 : Git
```bash
cd Desktop/nessycrea-site-vanilla
git log                           # Trouvez le commit
git checkout <hash-du-commit>     # Restaurez
```

### Méthode 2 : Backups Documents
```bash
ls Documents/nessycrea-backups/   # Listez les backups
cp -r Documents/nessycrea-backups/nessycrea-XXXX Desktop/
```

### Méthode 3 : Downloads
Cherchez les fichiers `.zip`, `.html`, `.css`, `.js` dans Downloads

## 📌 RAPPEL POUR CLAUDE

Quand vous démarrez une nouvelle session, dites à Claude :

> "Avant toute modification, crée un commit git. Après chaque modification importante, fais un commit. Toutes les modifications doivent être sauvegardées dans git."

## 🔍 Vérifier les sauvegardes

```bash
# Vérifier Git
cd Desktop/nessycrea-site-vanilla
git log --oneline -10

# Vérifier les backups
ls -lh Documents/nessycrea-backups/

# Vérifier Downloads
ls -lht Downloads/*.{html,css,js,zip} 2>/dev/null | head -10
```

## ✅ CHECKLIST

Avant CHAQUE session Claude :
- [ ] Créer un commit git de sauvegarde
- [ ] Vérifier que git fonctionne
- [ ] Copie dans Documents si changement majeur

Pendant la session :
- [ ] Demander à Claude de commiter après chaque modif
- [ ] Vérifier les commits avec `git log`

Après la session :
- [ ] Commit final
- [ ] Backup dans Documents
- [ ] Export .zip dans Downloads

---

**Date de création :** 13 Novembre 2025
**Dernière sauvegarde :** `git log -1`
