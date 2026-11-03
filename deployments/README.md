# deployments

Infrastructure descriptors, packaging handoff files, installers, rollout/rollback assets, and deployment documentation.

No deployment artifact is defined at scaffold time. Browser surfaces currently produce static artifacts under `apps/*/dist/<deployment-profile>/<environment>/`.

When a server runtime or container image is added, keep deployment descriptors here and source configuration under `etc/`. Follow `../sdkwork-specs/DEPLOYMENT_SPEC.md`, `../sdkwork-specs/SDKWORK_DEPLOY_SPEC.md`, and `../sdkwork-specs/DOCKER_SPEC.md`.
